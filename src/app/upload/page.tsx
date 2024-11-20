"use client";
import Image from "next/image";
import Section from "../components/section";
import Button from "../components/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic"
];

const uploadSchema = z.object({
  images: z
    .any()
    .refine((files) => files instanceof FileList, {
      message: "Please upload your photos",
    })
    .refine(
      (files: FileList) => files.length >= 10,
      {
        message: "Please upload at least 10 photos",
      }
    )
    .refine(
      (files: FileList) => files.length <= 30,
      {
        message: "Maximum 30 photos allowed",
      }
    )
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

type UploadSchema = z.infer<typeof uploadSchema>;

const Upload = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

  const [isDragging, setIsDragging] = useState(false);
  const selectedFiles = watch("images");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileCount = selectedFiles instanceof FileList ? selectedFiles.length : 0;

  // Update previews when files change
  useEffect(() => {
    if (selectedFiles && selectedFiles instanceof FileList) {
      const urls = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
      setPreviews(urls);
      
      // Cleanup
      return () => urls.forEach(url => URL.revokeObjectURL(url));
    }
  }, [selectedFiles]);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 2048,
      useWebWorker: true,
      fileType: 'image/jpeg',
      quality: 0.8,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
    status: string;
  }>({ current: 0, total: 0, status: '' });

  const createZipFile = async (files: File[]) => {
    const zip = new JSZip();
    const total = files.length;
    
    setProgress({ current: 0, total, status: 'Compressing photos...' });
    
    for (let i = 0; i < files.length; i++) {
      const compressedFile = await compressImage(files[i]);
      zip.file(`photo_${i + 1}.jpg`, compressedFile);
      setProgress(prev => ({ 
        ...prev, 
        current: i + 1,
        status: `Compressing photo ${i + 1} of ${total}...`
      }));
    }

    setProgress(prev => ({ ...prev, status: 'Creating zip file...' }));
    const zipContent = await zip.generateAsync({ type: 'blob' });
    return zipContent;
  };

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: UploadSchema) => {
    try {
      if (!(data.images instanceof FileList)) return;
      setIsLoading(true);

      // Compress and zip files
      const zipFile = await createZipFile(Array.from(data.images));

      setProgress(prev => ({ ...prev, status: 'Converting and uploading...' }));
      
      // Convert zip to base64
      const base64Zip = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]); // Remove data URL prefix
        };
        reader.readAsDataURL(zipFile);
      });

      // Send to endpoint
      const response = await fetch('https://n8n.diffusiondynamics.ai/webhook/vidmyself-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'purchase_attempt',
          photos_data: base64Zip,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload photos');
      }

      // Handle success (e.g., redirect to next page)
      console.log('Upload successful!');
      
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (show error message to user)
      setError('Failed to upload photos. Please try again.');
    } finally {
      setIsLoading(false);
      setProgress({ current: 0, total: 0, status: '' });
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
    // Trigger the file input change with dropped files
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      const dataTransfer = new DataTransfer();
      Array.from(droppedFiles).forEach(file => dataTransfer.items.add(file));
      fileInput.files = dataTransfer.files;
      // Trigger change event for react-hook-form
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <main>
      <Section className="container py-20 flex flex-col gap-4">
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-[25px] font-bold uppercase">
              Upload your photos here
            </p>
            <p className={`text-sm font-medium ${fileCount < 10 ? 'text-red-500' : fileCount > 30 ? 'text-red-500' : 'text-green-500'}`}>
              {fileCount} / Please upload between 10 and 30 photos
            </p>
          </div>
          <div 
            className={`flex cursor-pointer flex-col gap-2 items-center mb-10 justify-center border-dashed border-2 rounded-[32px] p-4 md:p-8 transition-colors
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dark'}
              ${previews.length > 0 ? 'bg-gray-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              {...register("images")}
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
                    <div key={index} className="relative aspect-square w-full">
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
                    {isDragging ? 'Drop files here' : 'Click to choose files or drag them here'}
                  </p>
                  <p className="text-dark text-[14px] font-light">
                    Upload JPG, JPEG, PNG, WEBP, or HEIC files
                  </p>
                  <p className="text-dark text-[14px] font-light">Size limit: 10MB</p>
                </>
              )}
            </label>
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message as string}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div className="flex w-full justify-center">
            <Button 
              type="submit" 
              title={isLoading ? "Processing..." : "Next page"}
              customClass={`md:w-fit w-full ${
                (!selectedFiles || fileCount < 10 || fileCount > 30 || isLoading) 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
              }`}
              isDisabled={!selectedFiles || fileCount < 10 || fileCount > 30 || isLoading}
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
      </Section>
    </main>
  );
};

export default Upload;
