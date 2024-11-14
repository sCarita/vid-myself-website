import Image from "next/image";
import Section from "./section";

const Examples = () => {
  const images = Array.from({ length: 10 }, () => `/placeholder.png`);
  return (
    <Section
      id="examples"
      className="flex flex-col py-20 gap-6 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-6 h-fit md:h-[360px]">
        <div className="flex flex-row flex-wrap gap-4 md:gap-0 md:flex-col bg-dark rounded-[32px] p-8 text-main leading-[50px] md:leading-[70px] text-[40px] md:text-[70px] font-black uppercase">
          <h2 className="block md:hidden">How it looks like?</h2>
          <h2 className="hidden md:block">Fast</h2>
          <h2 className="hidden md:block">Look</h2>
          <h2 className="hidden md:block">New</h2>
          <h2 className="hidden md:block">Style</h2>
        </div>
        <div className="bg-dark w-full rounded-[32px]">
          <Image
            src="/placeholder.png"
            alt="example"
            className="w-full h-full object-cover rounded-[32px]"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
      <div className="flex flex-row gap-6 overflow-hidden">
        {images.map((image, index) => (
          <div key={index} className="w-full h-full bg-dark rounded-[32px]">
            <Image
              src={image}
              alt="example"
              width={313}
              height={400}
              className="w-full h-full object-cover rounded-[32px]"
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Examples;
