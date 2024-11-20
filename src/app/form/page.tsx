"use client";
import Button from "../components/button";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Please use only letters, spaces, hyphens, and apostrophes"),
  
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Please use only letters, spaces, hyphens, and apostrophes"),
  
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .min(1, "Phone number is required"),
  
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .min(5, "Email is required")
    .max(254, "Email is too long"),
  
  question: z
    .string()
    .trim()
    .min(1, "Please provide more details (minimum 1 characters)")
    .max(2000, "Please keep your question under 2000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      question: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_N8N_ENDPOINT}/webhook/vidmyself-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'contact_us',
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phone,
          email: data.email,
          your_question: data.question,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  console.log(errors);
  console.log(isValid);

  return (
    <main>
      <Section className="container py-20 flex flex-col gap-4 relative">
        {isSuccess && (
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
              <h3 className="text-2xl font-bold text-center">Thank You!</h3>
              <p className="text-center text-gray-600">
                We've received your message and will get back to you via email shortly.
              </p>
              <Button 
                title="Close" 
                onClick={() => {
                  setIsSuccess(false);
                  router.push('/');
                }}
                customClass="mt-4"
              />
            </div>
          </div>
        )}
        <h1 className="text-dark text-[40px] md:text-[64px] font-bold uppercase">
          Have questions?
        </h1>
        <p className="text-dark text-[20px] mb-4 md:text-[25px] font-bold uppercase">
          Get in touch
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex flex-col gap-1">
              <input
                {...register("firstName")}
                className="input"
                type="text"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <input
                {...register("lastName")}
                className="input"
                type="text"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <input
                {...register("phone")}
                className="input"
                type="text"
                placeholder="Phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <input
                {...register("email")}
                className="input"
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <textarea
              {...register("question")}
              className="input"
              placeholder="Your question"
              rows={1}
            />
            {errors.question && (
              <p className="text-red-500 text-sm mt-1">
                {errors.question.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Button
              isDisabled={!isDirty || !isValid || isSubmitting}
              customClass="w-full md:w-auto"
              title={isSubmitting ? "Submitting..." : "Submit"}
            />
          </div>
        </form>
      </Section>
    </main>
  );
};

export default Form;
