"use client";
import Button from "../components/button";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z
    .string()
    .max(35)
    .regex(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed")
    .min(2, "First name is required"),
  lastName: z
    .string()
    .max(35)
    .regex(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters allowed")
    .min(2, "Last name is required"),
  phone: z
    .string()
    .max(15)
    .regex(/^[0-9+()]*$/, "Only numbers and +,()")
    .min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  question: z
    .string()
    .min(10, "Question is too short")
    .max(1000, "Question is too long"),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
      const response = await fetch(
        "https://n8n.diffusiondynamics.ai/webhook/vidmyself-contactus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "contact_us",
            first_name: data.firstName,
            last_name: data.lastName,
            phone_number: data.phone,
            email: data.email,
            your_question: data.question,
          }),
        }
      );

      if (response.ok) {
        reset();
        alert("Thank you for your submission!");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

  return (
    <main>
      <Section className="container py-20 flex flex-col gap-4">
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
              isDisabled={!isValid}
              customClass="w-full md:w-auto"
              title="Submit"
            />
          </div>
        </form>
      </Section>
    </main>
  );
};

export default Form;
