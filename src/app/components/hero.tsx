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
          <Button
            customClass="flex items-center gap-2 whitespace-nowrap"
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
