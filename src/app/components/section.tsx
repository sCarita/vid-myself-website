const Section = ({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section id={id} className={`main-container px-3 md:px-10 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
