import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";
import { ColdAttribute } from "./ColdAttribute";
import { HotAttribute } from "./HotAttribute";
import { formatPrice } from "./../utils/formatPrice";
import { Text } from "./Text";
import { drinkImages } from "../constants/products.tsx";
import { flavourImages } from "../constants/products.tsx";

export function Product({ product }) {
  const navigate = useNavigate();
  function handleClick() {
    const targetProductPath = generatePath(paths.product, { id: product.id });
    navigate(targetProductPath);
  }

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: "white",
        width: "full",
        maxHeight: "510px",
        margin: "20px",
        borderRadius: "20px",
        boxShadow: "0px 14px 25px -10px #d892217a",
        cursor: "pointer",
      }}
    >
      <div
        // onClick={() => navigate(paths.product)}
        style={{
          backgroundColor: "#d892217a",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          position: "relative",
          overflow: "hidden",

          // display: "flex",
          // justifyContent: "center",
        }}
      >
        <img
          src={flavourImages[product.flavourImage]}
          alt="flavour background image"
          style={{
            height: "250px",
            objectFit: "cover",
            width: "100%",
            opacity: "0.9",
            // objectPosition: "center bottom",
          }}
        />
        <img
          src={drinkImages[product.drinkImage]}
          alt="product image"
          style={{
            height: "240px",
            width: "200px",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        <div id="product-name" className="product-name">
          {product.name.toUpperCase()}
        </div>
        <div id="product-description" className="product-description">
          <Text id={product.description} />
        </div>
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
          }}
        >
          <div id="product-price" className="product-price">
            {formatPrice(product.price)}
          </div>
          <div id="attributes-options" className="attributes-options">
            {product.attributes.hot && <HotAttribute />}
            {product.attributes.cold && <ColdAttribute />}
          </div>
        </div>
      </div>
    </div>
  );
}
