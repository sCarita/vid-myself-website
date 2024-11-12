const pricePlans = {
  standard: {
    title: "standard",
    price: 40,
    features: [
      "30 seconds video",
      "custom video",
      "48-hour delivery",
      "music & sound effects",
      "watermark-free",
    ],
  },
  express: {
    title: "express",
    price: 85,
    features: [
      "all standard features",
      "24-hour delivery",
      "priority customer support",
    ],
  },
};
const Pricing = () => {
  return (
    <section>
      <h3>Pricing</h3>
      <p>Choose your video delivery</p>
      <div>
        <h4>{pricePlans.standard.title}</h4>
        <p>{pricePlans.standard.price}€ /video</p>
        {pricePlans.standard.features.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>
      <div>
        <h4>{pricePlans.express.title}</h4>
        <p>{pricePlans.express.price}€ /video</p>
        {pricePlans.express.features.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
