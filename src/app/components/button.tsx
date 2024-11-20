import Link from "next/link";

type Props = {
  title: string;
  variant?: "primary" | "secondary";
  customClass?: string;
  sufix?: React.ReactNode;
  href?: string;
  isDisabled?: boolean;
  onClick?: () => void;
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
  isDisabled = false,
  onClick,
}: Props) => {
  const buttonElement = (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${Variants[variant]} px-4 py-2 rounded-full font-bold ${
        isDisabled ? "opacity-50" : ""
      } ${customClass}`}
    >
      {title}
      {sufix}
    </button>
  );
  return href ? <Link href={href}>{buttonElement}</Link> : buttonElement;
};

export default Button;
