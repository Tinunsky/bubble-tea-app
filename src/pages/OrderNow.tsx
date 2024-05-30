import { useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrow_left_white.svg";
import { Product } from "../components/Product";
import { paths } from "../utils/Router";
import { CSSProperties, useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { ButtonViewOrder } from "../components/fixedButtons/ButtonViewOrder";
import { Loading } from "../components/Loading";

export const containerStyle: CSSProperties = {
  backgroundSize: "cover",
  backgroundPosition: "center top",
  display: "flex",
  flexDirection: "column",
};

export function OrderNow() {
  const navigate = useNavigate();
  const { isAddedToCart, productsCart, products } =
    useContext(BubbleTeaContext);
  console.log("productsCart", productsCart);

  if (!products) return <Loading />;
  return (
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
      <div style={{ height: "100px" }}></div>
      {isAddedToCart && <ButtonViewOrder />}
    </div>
  );
}
