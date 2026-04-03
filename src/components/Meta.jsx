import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Sleepyyy™",
  description:
    "We offer premium-quality products designed to deliver lasting value and performance — excellence you can trust, at prices that make sense.",
  keywords: "Bed and Pillows covers",
};

export default Meta;
