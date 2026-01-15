import React from "react";

const Categories = () => {
  const categories = [
    {
      name: "Rings",
      subtitle: "Diamond Bands",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBt9OB2He0tOsS0-IiiqwCG6mAm1l1WYZ4dQz5ETQ0v1fX8uXLJ3A724YZMpmqagQGjLg6aFR0PFEn6nyV3Up6WducABD-7B2MJ3HyHMyFML_xoFNP6h3GGuWo-pfrZh1NAuYoKn5usYLZqbau6-oK54jFo1OeXg2ixcj-RTiHPxqNXkZOd2XgBhSdwPsIHyoXgnyoRpKmIHs5NIrzzi8MQDbpxWwU9OKykwxWS9hdAcPULBtS29S2OdEetuNVr1t50C4bYhbRn3qxt",
      alt: "Close-up of a luxury diamond wedding band",
    },
    {
      name: "Necklaces",
      subtitle: "Gold Pendants",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZR_I6q4si0f2myHuwfDCFHTO31kCaB0aKkV9M9AknCLW1kj6N1tvd4EcWh8lQlwV1UBWgnMftATtOQF_VYp63XDIspI3JIXfmqkhB5flcqi-PYlN7s2R04dDXEHG8eswL4HpM_VH661NzPNJ0wdheqEqk015W3ZztG2O8-J90yxRFnuR_a5KVObip4rRSqASbfmUyKEA9V-Rr8nO-admrixgzZUFM5Zo6jZ4MEJ3HheB44otPFu6iow8zqRWmduEwduzr52vmxl3Q",
      alt: "Gold pendant necklace with delicate chain",
    },
    {
      name: "Earrings",
      subtitle: "Pearl Drops",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAI2-K-J6ajMVx2a0KCHqU5fnzR-YhvkU4wDFo8I545wHE0F7hGAQz2r0uzwxp7xBM_i-5O0h6pa56Xz9io8Nhj9JP5rpZbAddQurDREs_xe-FNxY418QZIauflF7ugaAmFJ2hEGT7GE_5w5tHvBB8jQubz_uotR6M8tMJMWygLY4O63Vft-K1ATszD3snGMNnGZpAE0QXCrr_MShzZ5BEFFz-iaAud8-KM8I2K50cKjJouJstY2-um1YIG9ysgdk_JlAm0i4AiErZW",
      alt: "Pair of elegant pearl drop earrings",
    },
    {
      name: "Bracelets",
      subtitle: "Structured Cuffs",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDuPf3jxMUSW4JMR-P-tfG8nBCK2pEvZBGtNY0RQiDhn_ioKvv5qyzXMQvK4emAW0b6FEcz2udf_Xp_n3JbVRfUhy4O8seVqeyQttOG967qdWN9mCuznhVqeXofAdQvYw8UjN-T4Cng4uR8m2mJF4GgKwp8zj5C90_oHTMByooHUtmy6vgtcesrOdE2R8SloBHrf_1yVGhSwNcOl5MYmasFkXLFMQ6ghy0IDMnWoBXEK1eHdqOKuYq0AVXXPXnyB_9gmISMqx0_uUZw",
      alt: "Structured gold cuff bracelet",
    },
  ];

  const sectionHeaderStyle = {
    maxWidth: "1280px",
    margin: "0 auto 48px",
    padding: "0 24px",
    textAlign: "center",
  };

  const gridStyle = {
    gap: "48px",
    maxWidth: "1280px",
    margin: "0 auto 128px",
    padding: "0 24px",
  };

  const categoryItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  };

  const imageContainerStyle = {
    position: "relative",
    marginBottom: "24px",
    overflow: "hidden",
    borderRadius: "50%",
    aspectRatio: "1",
    width: "100%",
    maxWidth: "220px",
    border: "1px solid rgba(166, 144, 89, 0.1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      {/* Section Header */}
      <section style={sectionHeaderStyle}>
        <h2
          style={{
            color: "#7c786e",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            marginBottom: "16px",
          }}
        >
          Curated Selections
        </h2>
        <p
          style={{
            fontSize: "1.875rem",
            fontWeight: 300,
            marginBottom: "24px",
          }}
        >
          Shop by Category
        </p>
        <div
          style={{
            width: "64px",
            height: "1px",
            backgroundColor: "#a69059",
            margin: "0 auto",
          }}
        ></div>
      </section>

      {/* Category Grid */}
      <section>
        <div style={gridStyle} className="grid md:grid-cols-4 grid-cols-2">
          {categories.map((category, index) => (
            <div
              key={index}
              style={categoryItemStyle}
              className="hover-scale"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
                const img = e.currentTarget.querySelector(".image-zoom");
                if (img) img.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                const img = e.currentTarget.querySelector(".image-zoom");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <div style={imageContainerStyle}>
                <div
                  className="image-zoom"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url('${category.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.7s",
                  }}
                  aria-label={category.alt}
                />
              </div>
              <p
                style={{
                  color: "#161513",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  letterSpacing: "0.025em",
                  marginBottom: "4px",
                }}
              >
                {category.name}
              </p>
              <p
                style={{
                  color: "#7c786e",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  transition: "color 0.3s",
                }}
              >
                {category.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Categories;
