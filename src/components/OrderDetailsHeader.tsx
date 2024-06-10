import { useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrow_left.svg";
import storeIcon from "../assets/store_icon.svg";
import { paths } from "../utils/Router";
import { Text } from "./Text";

export function OrderDetailsHeader() {

  const navigate = useNavigate();
  const textBold = { fontWeight: "bold", letterSpacing: "1px" };
  
  return (
    <>
      <div style={{ padding: "20px 25px" }}>
        <img
          src={arrowLeft}
          alt="arrow left"
          style={{
            height: "30px",
            cursor: "pointer",
            marginTop: "5px",
          }}
          onClick={() => navigate(paths.orderNow)}
        />
        <div
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            textAlign: "center",
            margin: "20px",
          }}
        >
          <Text id={"YOUR_ORDER"} />
        </div>
        <div
          style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}
        >
          <Text id={"SIP_IN"} />:
        </div>
      </div>
      <div style={{ paddingBottom: "25px" }}>
        <div className="short-separation-line"></div>
        <div style={{ display: "flex", marginLeft: "70px", padding: "20px" }}>
          <img
            src={storeIcon}
            alt="store icon"
            style={{
              height: "25px",
              padding: "5px",
              marginRight: "20px",
              backgroundColor: "#f1efef",
              borderRadius: "3px",
            }}
          />
          <div>
            <div style={textBold}>Chinese Tofu Magician</div>
            <div style={{ color: "#817b7a" }}>
              C/del Consell de Cent, 391, L'Eixample, 08009 Barcelona
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
