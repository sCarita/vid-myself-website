"use client";
import Image from "next/image";
import Section from "../components/section";
import Button from "../components/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, createContext } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { useStep } from "../context/StepContext";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
];

const uploadSchema = z.object({
  images: z
    .any()
    .refine((files) => files instanceof FileList, {
      message: "Please upload your photos",
    })
    .refine((files: FileList) => files.length >= 10, {
      message: "Please upload at least 10 photos",
    })
    .refine((files: FileList) => files.length <= 30, {
      message: "Maximum 30 photos allowed",
    })
    .refine(
      (files: FileList) =>
        Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "Each file must be less than 10MB",
      }
    )
    .refine(
      (files: FileList) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
});

const detailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  plan: z.enum(["standard", "express"], {
    required_error: "Please select a plan",
  }),
});

type UploadSchema = z.infer<typeof uploadSchema>;
type DetailsSchema = z.infer<typeof detailsSchema>;

// Add this type guard function at the top level of your file
function isFileList(value: unknown): value is FileList {
  return (
    value !== null &&
    typeof value === "object" &&
    "length" in value &&
    "item" in value
  );
}

const Upload = () => {
  const { currentStep, setCurrentStep } = useStep();
  const [zipFile, setZipFile] = useState<Blob | null>(null);

  const uploadForm = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const detailsForm = useForm<DetailsSchema>({
    resolver: zodResolver(detailsSchema),
  });

  const [isDragging, setIsDragging] = useState(false);
  const selectedFiles = uploadForm.watch("images");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileCount = isFileList(selectedFiles) ? selectedFiles.length : 0;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
    status: string;
  }>({ current: 0, total: 0, status: "" });

  useEffect(() => {}, [currentStep]);

  // Update previews when files change
  useEffect(() => {
    if (selectedFiles && isFileList(selectedFiles)) {
      const urls = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(urls);

      // Cleanup
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [selectedFiles]);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 2048,
      useWebWorker: true,
      fileType: "image/jpeg",
      quality: 0.8,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    }
  };

  const createZipFile = async (files: File[]) => {
    const zip = new JSZip();
    const total = files.length;

    setProgress({ current: 0, total, status: "Compressing photos..." });

    for (let i = 0; i < files.length; i++) {
      const compressedFile = await compressImage(files[i]);
      zip.file(`photo_${i + 1}.jpg`, compressedFile);
      setProgress((prev) => ({
        ...prev,
        current: i + 1,
        status: `Compressing photo ${i + 1} of ${total}...`,
      }));
    }

    setProgress((prev) => ({ ...prev, status: "Creating zip file..." }));
    const zipContent = await zip.generateAsync({ type: "blob" });
    return zipContent;
  };

  const onUploadSubmit = async (data: UploadSchema) => {
    try {
      if (!isFileList(data.images)) return;
      setIsLoading(true);
      setError(null);

      // Compress and zip files
      const compressedZip = await createZipFile(Array.from(data.images));
      setZipFile(compressedZip);
      setCurrentStep(2);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Failed to process photos. Please try again.");
    } finally {
      setIsLoading(false);
      setProgress({ current: 0, total: 0, status: "" });
    }
  };

  const onDetailsSubmit = async (data: DetailsSchema) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!zipFile) {
        throw new Error("No photos found. Please upload photos first.");
      }

      setProgress((prev) => ({ ...prev, status: "Uploading..." }));

      const formData = new FormData();
      formData.append("event_type", "purchase_attempt");
      formData.append("photos", zipFile, "photos.zip");
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("plan", data.plan);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_N8N_ENDPOINT}/webhook/vidmyself-events`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error(
          `Failed to submit order: ${response.status} - ${errorText}`
        );
      }

      const responseText = await response.text();
      const result = JSON.parse(responseText);

      // Handle successful response (e.g., redirect to Stripe)
      if (result.stripeUrl) {
        window.location.href = result.stripeUrl;
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit order. Please try again."
      );
    } finally {
      setIsLoading(false);
      setProgress({ current: 0, total: 0, status: "" });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      const dataTransfer = new DataTransfer();
      Array.from(droppedFiles).forEach((file) => dataTransfer.items.add(file));
      fileInput.files = dataTransfer.files;
      fileInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  return (
    <main>
      <Section>
        <div className="main-container-md py-20 flex flex-col gap-4">
          {currentStep === 1 ? (
            <>
              <h1 className="text-dark text-[40px] md:text-[64px] font-bold uppercase">
                Upload your photos
              </h1>
              <p className="text-dark text-[20px] md:text-[25px] font-bold uppercase">
                Photo upload guidelines
              </p>
              <div className="grid grid-cols-3 gap-4">
                <Image
                  src="/front_face.png"
                  alt="example 1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <Image
                  src="/side_view.png"
                  alt="example 2"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <Image
                  src="/body.png"
                  alt="example 3"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="flex flex-col gap-2 text-dark text-[16px] md:text-[20px] font-medium uppercase md:mb-10 mb-4">
                <p>Front-facing, well-lit photo</p>
                <p>Side view with clear features</p>
                <p>Full-body shot for dynamic movement</p>
              </div>
              <form
                onSubmit={uploadForm.handleSubmit(onUploadSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-[25px] font-bold uppercase">
                    Upload your photos here
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      fileCount < 10
                        ? "text-red-500"
                        : fileCount > 30
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {fileCount} / Please upload between 10 and 30 photos
                  </p>
                </div>
                <div
                  className={`flex cursor-pointer flex-col gap-2 items-center mb-10 justify-center border-dashed border-2 rounded-[32px] p-4 md:p-8 transition-colors
                  ${isDragging ? "border-blue-500 bg-blue-50" : "border-dark"}
                  ${previews.length > 0 ? "bg-gray-50" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    {...uploadForm.register("images")}
                    className="hidden"
                    type="file"
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-full h-full cursor-pointer flex flex-col items-center"
                  >
                    {previews.length > 0 ? (
                      <div className="grid grid-cols-6 md:grid-cols-8 gap-2 w-full">
                        {previews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative aspect-square w-full"
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded-md"
                              sizes="(max-width: 768px) 16vw, 12.5vw"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="text-dark text-[14px] font-bold">
                          {isDragging
                            ? "Drop files here"
                            : "Click to choose files or drag them here"}
                        </p>
                        <p className="text-dark text-[14px] font-light">
                          Upload JPG, JPEG, PNG, WEBP, or HEIC files
                        </p>
                        <p className="text-dark text-[14px] font-light">
                          Size limit: 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
                {uploadForm.formState.errors.images && (
                  <p className="text-red-500 text-sm">
                    {uploadForm.formState.errors.images.message as string}
                  </p>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex w-full justify-center">
                  <Button
                    type="submit"
                    title={isLoading ? "Processing..." : "Next page"}
                    customClass={`flex gap-2 items-center md:w-fit w-full ${
                      !selectedFiles ||
                      fileCount < 10 ||
                      fileCount > 30 ||
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    isDisabled={
                      !selectedFiles ||
                      fileCount < 10 ||
                      fileCount > 30 ||
                      isLoading
                    }
                    sufix={
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.293 0.959779C8.48053 0.772308 8.73484 0.666992 9 0.666992C9.26516 0.666992 9.51947 0.772308 9.707 0.959779L15.707 6.95978C15.8945 7.14731 15.9998 7.40162 15.9998 7.66678C15.9998 7.93194 15.8945 8.18625 15.707 8.37378L9.707 14.3738C9.5184 14.5559 9.2658 14.6567 9.0036 14.6545C8.7414 14.6522 8.49059 14.547 8.30518 14.3616C8.11977 14.1762 8.0146 13.9254 8.01233 13.6632C8.01005 13.401 8.11084 13.1484 8.293 12.9598L12.586 8.66678H1C0.734784 8.66678 0.48043 8.56142 0.292893 8.37389C0.105357 8.18635 0 7.932 0 7.66678C0 7.40156 0.105357 7.14721 0.292893 6.95967C0.48043 6.77214 0.734784 6.66678 1 6.66678H12.586L8.293 2.37378C8.10553 2.18625 8.00021 1.93194 8.00021 1.66678C8.00021 1.40161 8.10553 1.14731 8.293 0.959779Z"
                          fill="black"
                        />
                      </svg>
                    }
                  />
                </div>
                {isLoading && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-500">
                        {progress.status}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {progress.current} / {progress.total}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            <>
              <h1 className="text-dark text-[40px] md:text-[64px] font-bold uppercase">
                Details
              </h1>
              <form className="flex flex-col gap-6">
                <div className="space-y-4">
                  <h2 className="text-dark text-[20px] md:text-[25px] font-bold uppercase">
                    User Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      {...detailsForm.register("firstName")}
                      placeholder="First name"
                      className="border rounded-full px-4 py-2"
                      required
                    />
                    <input
                      {...detailsForm.register("lastName")}
                      placeholder="Last name"
                      className="border rounded-full px-4 py-2"
                      required
                    />
                  </div>
                  <input
                    {...detailsForm.register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-full px-4 py-2"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-dark text-[20px] md:text-[25px] font-bold uppercase">
                    Select the plan for purchase
                  </h2>
                  <div className="space-y-2">
                    <label className="flex items-center border rounded-full px-4 py-2">
                      <input
                        type="radio"
                        {...detailsForm.register("plan")}
                        value="standard"
                        className="mr-2"
                        required
                      />
                      Standard: 48-hour Delivery
                    </label>
                    <label className="flex items-center border rounded-full px-4 py-2">
                      <input
                        type="radio"
                        {...detailsForm.register("plan")}
                        value="express"
                        className="mr-2"
                        required
                      />
                      Express: 24-hour Delivery
                    </label>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    onClick={() => detailsForm.handleSubmit(onDetailsSubmit)()}
                    title={isLoading ? "Processing..." : "Checkout"}
                    customClass="md:w-fit w-full"
                    isDisabled={isLoading}
                  />
                </div>

                {isLoading && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-500">
                        {progress.status}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </Section>
    </main>
  );
};

export default Upload;
