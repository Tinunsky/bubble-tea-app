import { Button } from "./Button";
import { Text } from "../components/Text";
import arrowRight from "../assets/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";

export function ButtonOrderNow() {
    const navigate = useNavigate();
    
    return (
      <Button text={<Text id={"ORDER_NOW"} />} icon={arrowRight} inverted onClick={() => navigate(paths.orderNow)} />
    );
  }
  