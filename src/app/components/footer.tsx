"use client";

import Image from "next/image";
import Link from "next/link";
import { links } from "../utils";
import Button from "../components/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .min(5, "Email is required")
    .max(254, "Email is too long"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const Footer = () => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_N8N_ENDPOINT}/webhook/vidmyself-events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "subscribe_newsletter",
            email: data.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setShowModal(true);
      reset();
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-[#060606] text-white">
      <div className="main-container flex flex-col md:flex-row justify-between items-left md:items-center gap-10 px-4 py-8 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={160} height={44} />
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                className="font-medium uppercase"
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:min-w-[400px]">
          <h3 className="text-main uppercase font-bold text-xl">
            Sign up for the newsletter
          </h3>
          <p className="font-medium text-sm">
            Subscribe to get the latest news, and AI inspiration.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row sm:items-center gap-2"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center px-4 py-1.5 rounded-full border-main border">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-white placeholder:font-bold"
                />
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.50638 0.46444C7.67046 0.300403 7.89298 0.208252 8.125 0.208252C8.35702 0.208252 8.57954 0.300403 8.74362 0.46444L13.9936 5.71444C14.1577 5.87853 14.2498 6.10105 14.2498 6.33307C14.2498 6.56508 14.1577 6.7876 13.9936 6.95169L8.74362 12.2017C8.5786 12.3611 8.35757 12.4493 8.12815 12.4473C7.89873 12.4453 7.67927 12.3533 7.51703 12.191C7.3548 12.0288 7.26278 11.8093 7.26079 11.5799C7.25879 11.3505 7.34699 11.1295 7.50638 10.9644L11.2628 7.20807H1.125C0.892936 7.20807 0.670376 7.11588 0.506282 6.95178C0.342187 6.78769 0.25 6.56513 0.25 6.33307C0.25 6.101 0.342187 5.87844 0.506282 5.71435C0.670376 5.55025 0.892936 5.45807 1.125 5.45807H11.2628L7.50638 1.70169C7.34234 1.5376 7.25019 1.31508 7.25019 1.08307C7.25019 0.851046 7.34234 0.628527 7.50638 0.46444Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              isDisabled={!isDirty || !isValid || isSubmitting}
              title={isSubmitting ? "Subscribing..." : "Subscribe"}
              customClass="!py-2.5 whitespace-nowrap"
            />
          </form>
          {message && (
            <p
              className={`text-sm ${
                message.includes("wrong") ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
            <h3 className="text-2xl font-bold text-center text-gray-900">
              Welcome Aboard!
            </h3>
            <p className="text-center text-gray-600">
              Thank you for subscribing to our newsletter. Stay tuned for the
              latest updates and AI inspiration!
            </p>
            <Button
              title="Close"
              onClick={() => setShowModal(false)}
              customClass="mt-4"
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
