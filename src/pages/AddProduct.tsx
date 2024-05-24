import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../assets/arrow_left.svg";
import plusCircle from "../assets/plus_circle.svg";
import minusCircle from "../assets/minus_circle.svg";
import { ButtonProductAttribute } from "../components/ButtonProductAttribute";
import { paths } from "../utils/Router";
import { ButtonAddToCart } from "../components/ButtonAddToCart";
import { products } from "./../constants/products";
import { HotAttribute } from "../components/HotAttribute";
import { ColdAttribute } from "../components/ColdAttribute";
import { useState } from "react";
import { formatPrice } from '../utils/formatPrice';

export const containerStyle = {
  //   background: "#ffffff",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  //   minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const product = products?.find((product) => product.id === productId);
  const productCost = product.price;
  const [productAmount, setProductAmount] = useState(1);
  const [isProductAmountMoreThenOne, setIsProductAmountMoreThenOne] =
    useState(false);
  const [totalCostPerProduct, setTotalCostPerProduct] = useState(productCost);

  const additionalOptionsText = {
    fontSize: "1.6em",
    fontWeight: "bold",
    paddingBlock: "10px",
  };

  const textBold = {
    fontSize: "1.6em",
    fontWeight: "bold",
  };

  const addRestIconsStyle = {
    height: "20px",
    cursor: "pointer",
    marginTop: "2px",
    fontWeight: isProductAmountMoreThenOne ? "bold" : "normal",
  };

  function handleAmount(change: number) {
    if (productAmount + change >= 1) {
      setProductAmount(productAmount + change);
      calculateTotalCostPerProduct();

      setIsProductAmountMoreThenOne(true);
    }
  }

  const calculateTotalCostPerProduct = () => {
    setTotalCostPerProduct(productCost * productAmount);
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          backgroundColor: "#d892217a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={arrowLeft}
          alt="arrow left"
          style={{
            maxHeight: "30px",
            marginLeft: "20px",
            marginTop: "20px",
            cursor: "pointer",
            position: "absolute",
            zIndex: 1,
          }}
          onClick={() => navigate(paths.orderNow)}
        />
        <img
          src={product.flavourImage}
          alt="flavour background image"
          style={{
            height: "300px",
            objectFit: "cover",
            width: "100%",
            opacity: "0.9",
            // objectPosition: "center bottom",
          }}
        />
        <img
          src={product.drinkImage}
          alt="product image"
          style={{
            height: "200px",
            width: "200px",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          minHeight: "100px",
          padding: "10px",
          marginInline: "20px",
        }}
      >
        <div style={{ paddingBlock: "10px" }}>
          <div id="product-name" className="product-name">
            {product.name.toUpperCase()}
          </div>
          <div id="product-price" className="product-price">
            {formatPrice(product.price)}
          </div>
          <div id="product-description" className="product-description">
            {product.description}
          </div>
          <div id="attributes-options" className="attributes-options py-5">
            {product.attributes.hot && <HotAttribute />}
            {product.attributes.cold && <ColdAttribute />}
          </div>
          <div className="separation-line"></div>
        </div>

        <div style={additionalOptionsText}>COLD OR HOT?</div>
        <div>
          <ButtonProductAttribute name={"No ice"} />
          <ButtonProductAttribute name={"Less ice"} />
          <ButtonProductAttribute name={"Regular ice"} />
          <ButtonProductAttribute name={"Hot (45°C)"} />
          <ButtonProductAttribute name={"Hot (60°C)"} />
        </div>
        <div style={{ margin: "10px" }}></div>
        <div style={additionalOptionsText}>HOW SWEET?</div>
        <div>
          <ButtonProductAttribute name={"No sugar"} />
          <ButtonProductAttribute name={"30% sugar"} />
          <ButtonProductAttribute isClicked={true} name={"50% sugar"} />
          <ButtonProductAttribute name={"70% sugar"} />
        </div>
        <div className="separation-line"></div>
        <div
          id="total-calculation"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBlock: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={textBold}>TOTAL</div>
            <div className="product-price">{formatPrice(totalCostPerProduct)}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBlock: "11px",
            }}
          >
            <img
              src={minusCircle}
              alt="plus"
              style={addRestIconsStyle}
              onClick={() => handleAmount(-1)}
            />
            <div
              style={{
                border: "2px #000 solid",
                width: "25px",
                height: "22px",
                borderRadius: "5px",
                marginInline: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {/* i need to see how to add amount for the product */}
              {productAmount}
            </div>
            <img
              src={plusCircle}
              alt="plus"
              style={addRestIconsStyle}
              onClick={() => handleAmount(1)}
            />
          </div>
        </div>
        <div style={{ marginBottom: "100px" }}></div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          width: "500px",
          marginLeft: "25px",
        }}
      >
        <ButtonAddToCart cost={totalCostPerProduct} />
      </div>
    </div>
  );
}
