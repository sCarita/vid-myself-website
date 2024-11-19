import Button from "./button";
import Section from "./section";

const CTA = () => {
  return (
    <Section className="flex justify-center items-center h-[215px] bg-gradient-to-t from-[#CBED5E] to-[#FFF]">
      <Button title="Get Started" variant="secondary" />
    </Section>
  );
};

export default CTA;
