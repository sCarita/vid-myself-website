import Button from "./button";
import Section from "./section";

const CTA = () => {
  return (
    <Section className="flex justify-center items-center h-[215px] bg-gradient-to-t from-[#CBED5E] to-[#F7F7F7]">
      <Button title="Get Started" variant="secondary" href="/upload" />
    </Section>
  );
};

export default CTA;
