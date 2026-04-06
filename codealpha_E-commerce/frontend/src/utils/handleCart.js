const handleCart = (navigate, user) => {
  if (!user) {
    navigate("/login", { state: { from: "/cart" } });
    return;
  }

  navigate("/cart");
};

export default handleCart;
