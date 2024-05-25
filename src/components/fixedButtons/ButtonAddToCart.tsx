import { Button } from "../Button";
import { Text } from "../Text";
import { formatPrice } from "../../utils/formatPrice";
import { fixedButtonStyle } from "./fixedButtonStyle";

export function ButtonAddToCart({
  costPerProduct,
  onAddToCartClick,
}: {
  costPerProduct: number;
  onAddToCartClick: () => void;
}) {
  return (
    <div style={fixedButtonStyle}>
      <Button
        text={"Add to cart"}
        additionalText={formatPrice(costPerProduct)}
        inverted
        onClick={onAddToCartClick}
      />
    </div>
  );
}
