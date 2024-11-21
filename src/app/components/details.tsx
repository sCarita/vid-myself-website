import Section from "./section";

const info = [
  {
    title: "AI precision",
    description:
      "Our AI, ensures a realistic video that captures your real look.",
  },
  {
    title: "Professional editing",
    description:
      "expert editors add music, effects, delivering a premium, ready-to-share video.",
  },
  {
    title: "Fast & flexible delivery",
    description: "standard delivery in 48 houts, or express in 24-hours.",
  },
];
const Details = () => {
  return (
    <Section id="details" className="flex flex-col gap-6 py-20">
      <h3 className="text-dark border border-dark rounded-[32px] p-6 md:p-8 text-[40px] md:text-[64px] font-bold uppercase">
        Our process
      </h3>
      <div className="flex flex-col px-3 md:px-6">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 border-b border-dark pb-4 mb-4"
          >
            <h4 className="uppercase text-dark text-[20px] md:text-[40px] font-bold">
              <span className="mr-2 w-[35px]">{index + 1}.</span>
              {item.title}
            </h4>
            <p className="pl-2 ml-[16px] md:ml-[35px] uppercase text-dark font-medium text-[16px] md:text-[25px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Details;
