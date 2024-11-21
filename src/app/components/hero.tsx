import Image from "next/image";
import Button from "./button";
import Section from "./section";

const Hero = () => {
  return (
    <Section className="flex flex-col md:flex-row gap-6 h-auto md:h-[50vh] justify-center items-center">
      <div className="flex flex-col gap-6 flex-1 justify-center">
        <h2 className="font-bold text-[40px] md:text-[50px] lg:text-[64px] uppercase leading-[48px] md:leading-[60px] lg:leading-[80px]">
          Turn your photos into a fashion video
        </h2>
        <p className="font-bold text-[20px] md:text-[25px] uppercase">
          Submit 10-20 photos and receive a fashion video
        </p>
        <div className="flex justify-center md:justify-start">
          <Button title="Get started" href="/upload" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1">
        <div className="flex md:justify-end">
          <Image
            src="/placeholder.png"
            alt="example"
            className="object-cover rounded-[32px]"
            width={160}
            height={266}
          />
        </div>
        <div className="flex flex-col justify-center md:items-end gap-4 lg:gap-10">
          <Image
            src="/placeholder.png"
            alt="example"
            className="object-cover rounded-[32px]"
            width={160}
            height={266}
          />
          <Image
            src="/placeholder.png"
            alt="example"
            className="object-cover rounded-[32px]"
            width={160}
            height={266}
          />
        </div>
        <div className="flex flex-col justify-center md:items-end gap-4 lg:gap-10">
          <Image
            src="/placeholder.png"
            alt="example"
            className="object-cover rounded-[32px]"
            width={160}
            height={266}
          />
          <Image
            src="/placeholder.png"
            alt="example"
            className="object-cover rounded-[32px]"
            width={160}
            height={266}
          />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
