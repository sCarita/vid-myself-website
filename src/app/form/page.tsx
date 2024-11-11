import Button from "../components/button";

const Form = () => {
  return (
    <main>
      <h1>Have questions?</h1>
      <p>Get in touch</p>
      <form>
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="text" placeholder="Phone number" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message" />
        <Button title="Submit" />
      </form>
    </main>
  );
};

export default Form;
