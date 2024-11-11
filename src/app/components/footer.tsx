import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="flex flex-col gap-4 px-3 py-8 sm:px-10 sm:py-16 bg-black text-white">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-3">
          <Image
            className="invert"
            src="/next.svg"
            alt="logo"
            width={100}
            height={100}
          />
          <div className="flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="#examples">Examples</Link>
            <Link href="#details">Details</Link>
            <Link href="#pricing">Pricing</Link>
          </div>
        </div>
        <div>newsletter</div>
      </div>

      <div className="flex flex-col justify-between gap-2 sm:flex-row-reverse sm:items-center">
        <p>© 2024 Next.js</p>
        <div>social</div>
      </div>
    </section>
  );
};

export default Footer;
