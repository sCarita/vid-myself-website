import Button from "./button";
import Section from "./section";

const CTA = () => {
  return (
    <section className="bg-gradient-to-t from-[#CBED5E] to-[#fff]">
      <Section className="flex justify-center items-center h-[215px]">
        <div className="flex items-center gap-4 md:gap-8 w-full">
          <div className="w-full border-b border-black" />
          <Button
            customClass="whitespace-nowrap"
            title="Get Started"
            variant="secondary"
            href="/upload"
          />
          <div className="w-full border-b border-black " />
        </div>
      </Section>
    </section>
  );
};

export default CTA;
