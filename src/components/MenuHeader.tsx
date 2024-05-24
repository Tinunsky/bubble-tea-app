import sojaHeart from "../assets/soja_heart.jpg";
import { Text } from "../components/Text";

export function MenuHeader({ buttonOnClick, text, textButton }) {
  return (
    <>
      <div
        className="header-menu"
        style={{
          backgroundColor: "#000000",
          color: "#fff",
          display: "flex",
          paddingLeft: "25px",
          height: "100px",
          alignItems: "center",
        }}
      >
        {" "}
        <img
          src={sojaHeart}
          alt="userIcon"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50px",
            marginRight: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBlock: "auto",
          }}
        >
          <div
            style={{
              fontSize: "1.3em",
              fontWeight: "bold",
              lineHeight: "1.1",
              paddingBottom: "5px",
            }}
          >
            {text}
          </div>
          <div
            style={{ color: "#bdb3b3", fontSize: "1.2em", cursor: "pointer" }}
            onClick={buttonOnClick}
          >
            {textButton}
          </div>
        </div>
      </div>
    </>
  );
}
