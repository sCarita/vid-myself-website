import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { links } from "../utils";

const Header = () => {
  return (
    <nav className="flex justify-between items-center px-3 py-3 sm:px-10 sm:py-4">
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
      <Button title="Contact us" href="/form" />
    </nav>
  );
};

export default Header;
