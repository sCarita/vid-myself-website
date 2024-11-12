import Button from "../components/button";
import Section from "../components/section";

const Form = () => {
  return (
    <main>
      <Section className="container py-20 flex flex-col gap-4">
        <h1 className="text-dark text-[40px] md:text-[64px] font-bold uppercase">
          Have questions?
        </h1>
        <p className="text-dark text-[20px] mb-4 md:text-[25px] font-bold uppercase">
          Get in touch
        </p>
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input" type="text" placeholder="First name" />
            <input className="input" type="text" placeholder="Last name" />
            <input className="input" type="text" placeholder="Phone number" />
            <input className="input" type="email" placeholder="Email" />
          </div>
          <textarea className="input" placeholder="Your question" rows={1} />
          <div className="mt-4">
            <Button customClass="w-full md:w-auto" title="Submit" />
          </div>
        </form>
      </Section>
    </main>
  );
};

export default Form;
