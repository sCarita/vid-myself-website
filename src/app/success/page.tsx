"use client";
import Section from "../components/section";
import Button from "../components/button";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  return (
    <main>
      <Section>
        <div className="main-container-md min-h-[80vh] py-20 flex items-center justify-center">
          <div className="bg-white rounded-[32px] p-8 max-w-md mx-4 relative flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center">
              Payment Successful!
            </h3>
            <p className="text-center text-gray-600">
              Thank you for your purchase! We have received your payment and
              photos. You will receive an email shortly with your custom video.
            </p>
            <Button
              title="Return Home"
              onClick={() => router.push("/")}
              customClass="mt-4"
            />
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Success;
