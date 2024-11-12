import Link from "next/link";

type Props = {
  title: string;
  variant?: "primary" | "secondary";
  customClass?: string;
  sufix?: React.ReactNode;
  href?: string;
};

const Variants = {
  primary: "bg-main text-dark",
  secondary: "bg-dark text-[#F3F3F3]",
};

const Button = ({
  title,
  customClass,
  sufix,
  href,
  variant = "primary",
}: Props) => {
  return (
    <button
      className={`${Variants[variant]} px-4 py-2 rounded-full font-bold ${customClass}`}
    >
      {href ? <Link href={href}>{title}</Link> : title}
      {sufix}
    </button>
  );
};

export default Button;
