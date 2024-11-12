import Link from "next/link";

type Props = {
  title: string;
  customClass?: string;
  sufix?: React.ReactNode;
  href?: string;
};
const Button = ({ title, customClass, sufix, href }: Props) => {
  return (
    <button
      className={`bg-main px-4 py-2 rounded-full font-bold ${customClass}`}
    >
      {href ? <Link href={href}>{title}</Link> : title}
      {sufix}
    </button>
  );
};

export default Button;
