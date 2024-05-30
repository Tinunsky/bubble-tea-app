import { Button } from "../Button";
import { Text } from "../Text";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/Router";
import { formatPrice } from "../../utils/formatPrice";
import { fixedButtonStyle } from "./fixedButtonStyle";
import { useContext } from "react";
import { BubbleTeaContext } from "../../contexts/BubbleTeaContext";

export function ButtonViewOrder() {
  const navigate = useNavigate();
  const { totalProductsCost } = useContext(BubbleTeaContext);

  const clickedAddToCart = () => {
    navigate(paths.orderDetails);
  };

  return (
    <div style={fixedButtonStyle}>
      <div className="appear-bottom">
        <Button
          text={<Text id={"VIEW_ORDER"} />}
          additionalText={formatPrice(totalProductsCost)}
          inverted
          onClick={clickedAddToCart}
        />
      </div>
    </div>
  );
}
