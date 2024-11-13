import Button from "./button";
import Section from "./section";

const Hero = () => {
  return (
    <Section className="flex flex-col gap-6 h-auto md:h-[50vh] justify-center">
      <h2 className="font-bold text-[40px] md:text-[64px] uppercase leading-[48px] md:leading-[80px]">
        Turn your photos into a fashion video
      </h2>
      <p className="font-bold text-[20px] md:text-[25px] uppercase">
        Submit 10-20 photos and receive a fashion video
      </p>
      <div className="flex justify-center md:justify-start">
        <Button title="Get started" href="/upload" />
      </div>
    </Section>
  );
};

export default Hero;
