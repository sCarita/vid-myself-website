"use client";
import Image from "next/image";
import Section from "../components/section";
import Button from "../components/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const uploadSchema = z.object({
  images: z
    .instanceof(FileList)
    .refine((files) => files.length === 3, {
      message: "Please upload exactly 3 images",
    })
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "Each file must be less than 10MB",
      }
    )
    .refine(
      (files) =>
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
  const {} = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
  });

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
        <div className="flex flex-col gap-4">
          <p className="text-[25px] font-bold uppercase">
            Upload your photos here
          </p>
          <div className="flex cursor-pointer flex-col gap-2 items-center mb-10 justify-center border-dashed border-dark border-[1px] rounded-[32px] p-4 md:p-8">
            <input className="hidden" type="file" />
            <p className="text-dark text-[14px] font-bold">
              Click to choose a file or drag it here
            </p>
            <p className="text-dark text-[14px] font-light">
              Upload JPG, JPEG, PNG, WEBP, or HEIC files
            </p>
            <p className="text-dark text-[14px] font-light">Size limit: 10MB</p>
          </div>
          <div className="flex w-full justify-center">
            <Button title="Next page" customClass="md:w-fit w-full" />
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Upload;
