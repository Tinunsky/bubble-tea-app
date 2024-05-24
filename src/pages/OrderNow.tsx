import { useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrow_left_white.svg";
import { Product } from "../components/Product";
import { paths } from "../utils/Router";
import { products } from "./../constants/products";

export const containerStyle = {
  // background: "#fffaf8",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  // height: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export function OrderNow() {
  const navigate = useNavigate();

  return (
    <>
      <div style={containerStyle}>
        <div
          style={{
            height: "100px",
            backgroundColor: "#000",
            display: "relative",
          }}
        >
          <img
            src={arrowLeft}
            alt="arrow left"
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              marginLeft: "20px",
              marginTop: "30px",
              cursor: "pointer",
            }}
            onClick={() => navigate(paths.home)}
          />
        </div>
        {products?.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
