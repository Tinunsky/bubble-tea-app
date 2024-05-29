import { Button } from "./Button";
import { Text } from "../components/Text";
import arrowRight from "../assets/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";

export function ButtonMyOrder() {
    const navigate = useNavigate();
    
    return (
      <Button text={"My order (1)"} icon={arrowRight} inverted onClick={() => navigate(paths.orderDetails)} />
    );
  }
  