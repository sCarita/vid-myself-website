"use client";
import Button from "../components/button";
import Section from "../components/section";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  question: z.string().min(1, "Question is required"),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  console.log(errors);
  console.log(isValid);

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
