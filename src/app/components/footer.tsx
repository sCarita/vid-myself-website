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
    <footer className="flex flex-col md:flex-row justify-between items-left md:items-center gap-10 px-4 py-8 sm:px-10 sm:py-16 bg-[#060606] text-white">
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
      <div className="flex flex-col gap-3">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={160} height={44} />
        </Link>
        <div className="flex items-center gap-10">
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
      <div className="flex flex-col gap-3">
        <h3 className="text-main uppercase font-bold text-xl">
          Sign up for the newsletter
        </h3>
        <p className="font-medium text-sm">
          Subscribe to get the latest news, and AI inspiration.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-1">
            <div className="flex rounded-full border-main border-2">
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
              />
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
            customClass="whitespace-nowrap"
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
    </footer>
  );
};

export default Footer;
