import Image from "next/image";
import Section from "../components/section";

const Upload = () => {
  return (
    <main>
      <Section className="container py-20 flex flex-col gap-4">
        <h1 className="text-dark text-[40px] md:text-[64px] font-bold uppercase">
          Upload your photos
        </h1>
        <p className="text-dark text-[20px] md:text-[25px] font-bold uppercase">
          Photo upload guidelines
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Image
            src="/images/upload.png"
            alt="example 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            src="/images/upload.png"
            alt="example 2"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            src="/images/upload.png"
            alt="example 3"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="flex flex-col gap-2 text-dark text-[20px] font-medium uppercase mb-10">
          <p>Front-facing, well-lit photo</p>
          <p>Side view with clear features</p>
          <p>Full-body shot for dynamic movement</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[25px] font-bold uppercase">
            Upload your photos here
          </p>
          <div className="flex cursor-pointer flex-col gap-2 items-center justify-center border-dashed border-dark border-[1px] rounded-[32px] p-8">
            <input className="hidden" type="file" />
            <p className="text-dark text-[14px] font-bold">
              Click to choose a file or drag it here
            </p>
            <p className="text-dark text-[14px] font-light">
              Upload JPG, JPEG, PNG, WEBP, or HEIC files
            </p>
            <p className="text-dark text-[14px] font-light">Soze limit: 10MB</p>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Upload;
