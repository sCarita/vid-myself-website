import Button from "./button";
import Section from "./section";

const pricePlans = {
  standard: {
    title: "standard",
    price: 40,
    features: [
      "30 seconds video",
      "custom video",
      "48-hour delivery",
      "music & sound effects",
      "watermark-free",
    ],
  },
  express: {
    title: "express",
    price: 85,
    features: [
      "all standard features",
      "24-hour delivery",
      "priority customer support",
    ],
  },
};

const PriceCard = ({
  title,
  price,
  features,
}: {
  title: string;
  price: number;
  features: string[];
  theBest: boolean;
}) => {
  return (
    <div className="flex flex-col w-full gap-4 border-dark border-[1px] rounded-[27px] p-5">
      <div className="flex flex-col gap-4 mb-10">
        <h4 className="text-dark text-[20px] md:text-[25px] font-bold uppercase">
          {title}
        </h4>
        <p className="text-dark text-[25px] font-medium uppercase">
          <span className="text-dark text-[40px] font-extrabold">{price}€</span>{" "}
          /video
        </p>
        <div className="flex flex-col gap-2 font-medium uppercase text-[20px]">
          {features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      </div>
      <Button title="Get started" href="/upload" customClass="w-full" />
    </div>
  );
};

const Pricing = () => {
  return (
    <Section id="pricing" className="container py-20 flex flex-col gap-10">
      <div>
        <h3 className="md:text-[64px] text-[40px] font-bold uppercase">
          Pricing
        </h3>
        <p className="text-dark text-[20px] md:text-[25px] font-medium uppercase">
          Choose your video delivery
        </p>
      </div>
      <div className="flex flex-row items-center">
        <PriceCard {...pricePlans.standard} theBest={true} />
        <PriceCard {...pricePlans.express} theBest={false} />
      </div>
    </Section>
  );
};

export default Pricing;
