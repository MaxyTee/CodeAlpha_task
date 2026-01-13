import { useCartStore } from "../Store/CartStore";

const handleAddToCart = async (
  location,
  navigate,
  { user, product, quantity = 1, size = "small" }
) => {
  const addToCart = useCartStore.getState().addToCart;
  if (!user) {
    navigate("/login", {
      state: {
        from: location,
      },
    });
    return;
  }

  try {
    const payload = { user, product, quantity, size };
    await addToCart(payload);
  } catch (error) {
    console.log(error);
  }
};

export default handleAddToCart;
