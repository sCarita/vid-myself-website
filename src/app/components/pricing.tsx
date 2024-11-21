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
  customClass,
}: {
  title: string;
  price: number;
  features: string[];
  theBest: boolean;
  customClass?: string;
}) => {
  return (
    <div
      className={`flex flex-col w-full gap-4 border-dark border-[1px] rounded-[27px] p-5 ${customClass}`}
    >
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
      <Button
        customClass="w-full flex items-center justify-center gap-2 whitespace-nowrap"
        title="Get started"
        href="/upload"
        sufix={
          <svg
            width="16"
            height="13"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.293 1.12625C8.48053 0.938781 8.73484 0.833466 9 0.833466C9.26516 0.833466 9.51947 0.938781 9.707 1.12625L15.707 7.12625C15.8945 7.31378 15.9998 7.56809 15.9998 7.83325C15.9998 8.09842 15.8945 8.35273 15.707 8.54025L9.707 14.5403C9.5184 14.7224 9.2658 14.8232 9.0036 14.8209C8.7414 14.8187 8.49059 14.7135 8.30518 14.5281C8.11977 14.3427 8.0146 14.0919 8.01233 13.8297C8.01005 13.5675 8.11084 13.3149 8.293 13.1263L12.586 8.83325H1C0.734784 8.83325 0.48043 8.7279 0.292893 8.54036C0.105357 8.35282 0 8.09847 0 7.83325C0 7.56804 0.105357 7.31368 0.292893 7.12615C0.48043 6.93861 0.734784 6.83325 1 6.83325H12.586L8.293 2.54025C8.10553 2.35272 8.00021 2.09842 8.00021 1.83325C8.00021 1.56809 8.10553 1.31378 8.293 1.12625Z"
              fill="#000"
            />
          </svg>
        }
      />
    </div>
  );
};

const Pricing = () => {
  return (
    <Section id="pricing" className="py-20 ">
      <div className="main-container-md flex flex-col gap-10">
        <div>
          <h3 className="md:text-[64px] text-[40px] font-bold uppercase">
            Pricing
          </h3>
          <p className="text-dark text-[20px] md:text-[25px] font-medium uppercase">
            Choose your video delivery
          </p>
        </div>
        <div className="flex flex-col md:flex-row max-md:gap-4 items-center">
          <PriceCard {...pricePlans.standard} theBest={true} />
          <PriceCard
            {...pricePlans.express}
            customClass="md:border-l-0 md:rounded-tl-none md:rounded-bl-none"
            theBest={false}
          />
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
