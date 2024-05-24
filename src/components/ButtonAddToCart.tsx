import { Button } from "./Button";
import { Text } from "../components/Text";
import arrowRight from "../assets/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";
import { useState } from "react";
import { formatPrice } from './../utils/formatPrice';

export function ButtonAddToCart({ cost }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  const clickedAddToCart = () => {
    setIsAddedToCart(true);
    isAddedToCart && navigate("/order-details");
  };

  return (
    <Button
      text={isAddedToCart ? "View order": "+ Add to cart"}
      additionalText={formatPrice(cost)}
      inverted
      onClick={clickedAddToCart}
    />
  );
}
