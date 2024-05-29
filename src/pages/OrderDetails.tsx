import { useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrow_left.svg";
import deleteIcon from "../assets/delete_icon.svg";
import storeIcon from "../assets/store_icon.svg";
import { paths } from "../utils/Router";
import { useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { formatPrice } from "./../utils/formatPrice";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { updateFirebaseDoc } from "../utils/updateFirebaseDoc";
import { firebaseAuth } from "./../firebase";
import { UserContext } from "../contexts/UserContext";
import { Timestamp } from "firebase/firestore";

export function OrderDetails() {
  const navigate = useNavigate();
  const { productsCart, setProductsCart, totalProductsCost, products, clearCart} =
    useContext(BubbleTeaContext);
  const { userName } = useContext(UserContext);

  const uploadOrder = async () => {
    const newOrder = {
      id: crypto.randomUUID(),
      userId: firebaseAuth.currentUser.uid,
      fullName: userName,
      updatedAt: Timestamp.now(),
      takeAway: false,
      myOrder: productsCart,
      isPaid: false,
      totalOrderCost: totalProductsCost,
    };
    updateFirebaseDoc("orders", "orders", newOrder);
  };

  const removeCartItem = (index) => {
    setProductsCart((prev) => {
      const newProductsCart = [...prev];
      newProductsCart.splice(index, 1);
      return newProductsCart;
    });
  };

  const onConfirmOrder = () => {
    uploadOrder().then(() => navigate(paths.myOrders));
    clearCart()
  };

  const textBold = { fontWeight: "bold", letterSpacing: "1px" };

  console.log("products", products);
  if (products.length < 1) return <>Loading...</>;
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
          YOUR ORDER{" "}
        </div>
        <div
          style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "30px" }}
        >
          Sip in:
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
      <div style={{ backgroundColor: "#f1efef" }}>
        <div className="separation-line"></div>
        <div style={{ fontWeight: "bold", fontSize: "1.2em", padding: "25px" }}>
          Summary
        </div>
        <div>
          {/* cart item */}

          {productsCart.map((cartItem, index) => {
            const itemProduct = products?.find(
              (product) => product.id === cartItem.id
            );
            const totalProductCost = itemProduct.price * cartItem.productAmount;

            {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="short-separation-line"></div>
                  <div
                    style={{
                      display: "flex",
                      padding: "25px",
                      justifyContent: "space-between",
                      marginLeft: "70px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex" }}>
                        <div style={textBold}>{itemProduct.name}</div>
                        <div
                          style={{
                            fontSize: "0.8em",
                            color: "#817b7a",
                            marginLeft: "15px",
                            paddingTop: "2px",
                          }}
                        >
                          ({cartItem.productAmount} x
                          {formatPrice(itemProduct.price)})
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#817b7a",
                          letterSpacing: "1px",
                          marginBlock: "5px",
                        }}
                      >
                        <Text id={itemProduct.description} />
                      </div>
                      {cartItem.attributes.map((attribute, key) => (
                        <div key={key}>
                          ⁃ <Text id={attribute} />
                        </div>
                      ))}
                      <div className="mt-5">
                        <img
                          src={deleteIcon}
                          alt="delete icon"
                          style={{
                            height: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => removeCartItem(index)}
                        />
                      </div>
                    </div>
                    <div style={textBold}>{formatPrice(totalProductCost)}</div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="separation-line"></div>
        <div
          style={{
            padding: "25px",
            fontWeight: "bold",
            fontSize: "1.2em",
            letterSpacing: "1px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>Total</div>
          <div>{formatPrice(totalProductsCost)}</div>
        </div>
        <div className="separation-line"></div>
      </div>
      <div style={{ marginBlock: "30px" }}>
        <Button text={"Confirm order"} onClick={onConfirmOrder} />
      </div>
    </>
  );
}
