import { useNavigate, useParams } from "react-router-dom";
import arrowLeft from "../assets/arrow_left.svg";
import plusCircle from "../assets/plus_circle.svg";
import minusCircle from "../assets/minus_circle.svg";
import disabledMinusCircle from "../assets/disabled_minus_circle.svg";
import { ButtonProductAttribute } from "../components/ButtonProductAttribute";
import { paths } from "../utils/Router";
import { ButtonAddToCart } from "../components/fixedButtons/ButtonAddToCart";
import { products } from "./../constants/products";
import { HotAttribute } from "../components/HotAttribute";
import { ColdAttribute } from "../components/ColdAttribute";
import { useContext, useState } from "react";
import { formatPrice } from "../utils/formatPrice";
import {
  Attribute,
  BubbleTeaContext,
  CartItem,
} from "../contexts/BubbleTeaContext";
import { ATTRIBUTES } from "../constants/ATTRIBUTES";

export const containerStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center top",
  display: "flex",
  flexDirection: "column",
};

export function AddProduct() {
  const { id } = useParams();
  const product = products?.find((product) => product.id === id);
  const navigate = useNavigate();
  const [productAmount, setProductAmount] = useState(1);
  
  const [selectedSweetness, setSelectedSweetness] = useState(
    ATTRIBUTES.sugar50
  );
  const defaultTemperature = product.attributes.cold
    ? ATTRIBUTES.regularIce
    : ATTRIBUTES.hot45;
  const [selectedTemperature, setSelectedTemperature] =
    useState(defaultTemperature);

  const { setTotalCartPrice, productsCart, setProductsCart, setIsAddedToCart } =
    useContext(BubbleTeaContext);

  const totalCostPerProduct = productAmount * product.price;
 

  console.log("selectedSweetness", selectedSweetness);
  console.log("selectedTemperature", selectedTemperature);
  console.log("productsCart", productsCart);

  const clickedAddToCart = () => {
    navigate(paths.orderNow);
    setIsAddedToCart(true);
    setTotalCartPrice((prev) => totalCostPerProduct + prev);
    const attributes: Attribute[] = [selectedSweetness, selectedTemperature];
    const newCartItem: CartItem = { id, productAmount, attributes };
    setProductsCart((s) => [...s, newCartItem]);
  };

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
    height: "22px",
    cursor: "pointer",
  };

  function handleAmount(change: number) {
    const newAmount = productAmount + change;
    if (newAmount >= 1) {
      setProductAmount(newAmount);
    }
  }

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
          {product.attributes.cold && (
            <>
              <ButtonProductAttribute
                name={"No ice"}
                id={ATTRIBUTES.noIce}
                setAttributeId={setSelectedTemperature}
                selectedId={selectedTemperature}
              />
              <ButtonProductAttribute
                name={"Less ice"}
                id={ATTRIBUTES.lessIce}
                setAttributeId={setSelectedTemperature}
                selectedId={selectedTemperature}
              />
              <ButtonProductAttribute
                name={"Regular ice"}
                id={ATTRIBUTES.regularIce}
                setAttributeId={setSelectedTemperature}
                selectedId={selectedTemperature}
              />
            </>
          )}
          {product.attributes.hot && (
            <>
              <ButtonProductAttribute
                name={"Hot (45°C)"}
                id={ATTRIBUTES.hot45}
                setAttributeId={setSelectedTemperature}
                selectedId={selectedTemperature}
              />
              <ButtonProductAttribute
                name={"Hot (60°C)"}
                id={ATTRIBUTES.hot60}
                setAttributeId={setSelectedTemperature}
                selectedId={selectedTemperature}
              />
            </>
          )}
        </div>
        <div style={{ margin: "10px" }}></div>
        <div style={additionalOptionsText}>HOW SWEET?</div>
        <div>
          <ButtonProductAttribute
            name={"No sugar"}
            id={ATTRIBUTES.sugar0}
            setAttributeId={setSelectedSweetness}
            selectedId={selectedSweetness}
          />
          <ButtonProductAttribute
            name={"30% sugar"}
            id={ATTRIBUTES.sugar30}
            setAttributeId={setSelectedSweetness}
            selectedId={selectedSweetness}
          />
          <ButtonProductAttribute
            name={"50% sugar"}
            id={ATTRIBUTES.sugar50}
            setAttributeId={setSelectedSweetness}
            selectedId={selectedSweetness}
          />
          <ButtonProductAttribute
            name={"70% sugar"}
            id={ATTRIBUTES.sugar70}
            setAttributeId={setSelectedSweetness}
            selectedId={selectedSweetness}
          />
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
            <div className="product-price">
              {formatPrice(totalCostPerProduct)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBlock: "11px",
            }}
          >
            <img
              src={productAmount === 1 ? disabledMinusCircle : minusCircle}
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
                marginInline: "15px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
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
      <ButtonAddToCart
        costPerProduct={totalCostPerProduct}
        onAddToCartClick={clickedAddToCart}
      />
    </div>
  );
}
