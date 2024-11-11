import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <section className="flex justify-between items-center px-3 py-3 sm:px-10 sm:py-4">
      <Image src="/next.svg" alt="logo" width={100} height={100} />

      <div className="hidden sm:flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="#examples">Examples</Link>
        <Link href="#details">Details</Link>
        <Link href="#pricing">Pricing</Link>
      </div>

      <button>Contact us</button>
    </section>
  );
};

export default Header;
