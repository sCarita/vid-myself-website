import Button from "./button";
import Section from "./section";

const CTA = () => {
  return (
    <section className="bg-gradient-to-t from-[#CBED5E] to-[#fff]">
      <Section className="flex justify-center items-center h-[215px]">
        <Button title="Get Started" variant="secondary" href="/upload" />
      </Section>
    </section>
  );
};

export default CTA;
