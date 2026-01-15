import React from "react";
import { Award } from "lucide-react";

const BrandStatement = () => {
  const sectionStyle = {
    backgroundColor: "rgba(166, 144, 89, 0.05)",
    padding: "96px 0",
  };

  const containerStyle = {
    maxWidth: "896px",
    margin: "0 auto",
    padding: "0 24px",
    textAlign: "center",
  };

  const valuesStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    borderTop: "1px solid rgba(166, 144, 89, 0.2)",
    paddingTop: "48px",
  };

  const values = [
    { label: "Recycled Gold", value: "100%" },
    { label: "Sourcing", value: "Ethical" },
    { label: "Warranty", value: "Life" },
  ];

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <Award size={40} color="#a69059" style={{ margin: "0 auto 24px" }} />
        <h3
          style={{
            color: "#161513",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: "32px",
          }}
        >
          Artisanship & Heritage
        </h3>
        <p
          style={{
            color: "#7c786e",
            fontSize: "1.125rem",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "672px",
            margin: "0 auto 48px",
            fontStyle: "italic",
            fontFamily: '"Noto Serif", serif',
          }}
        >
          "Every piece we create is a testament to the hands that shaped it. We
          believe jewelry shouldn't just be worn; it should be inherited."
        </p>
        <div style={valuesStyle}>
          {values.map((item, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#a69059",
                  marginBottom: "4px",
                }}
              >
                {item.value}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#7c786e",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
