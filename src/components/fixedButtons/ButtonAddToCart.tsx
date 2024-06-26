import { Button } from "../Button";
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
      <div className="appear-bottom">
        <Button
          text={"Add to cart"}
          additionalText={formatPrice(costPerProduct)}
          inverted
          onClick={onAddToCartClick}
        />
      </div>
    </div>
  );
}
