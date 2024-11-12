const info = [
  {
    title: "AI precision",
    description:
      "Our AI, ensures a realistic video that captures your real look.",
  },
  {
    title: "Professional editing",
    description:
      "expert editors add music, effects, delivering a premium, ready-to-share video.",
  },
  {
    title: "Fast & flexible delivery",
    description: "standard delivery in 48 houts, or express in 24-hours.",
  },
];
const Details = () => {
  return (
    <section>
      <h3>Our process</h3>
      {info.map((item, index) => (
        <div key={index}>
          <h4>
            {index + 1}.{item.title}
          </h4>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Details;
