import Image from "next/image";
import Link from "next/link";
import { links } from "../utils";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-left md:items-center gap-10 px-4 py-8 sm:px-10 sm:py-16 bg-[#060606] text-white">
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
          Subscribe to get the lastest news, and AI inspiration.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
