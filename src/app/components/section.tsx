const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <section className={`px-3 md:px-10 ${className}`}>{children}</section>;
};

export default Section;
