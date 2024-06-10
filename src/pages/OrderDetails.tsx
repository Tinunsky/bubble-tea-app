import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete_icon.svg";
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
import { AttributesList } from "../components/AttributesList";
import { Loading } from "../components/Loading";
import { OrderDetailsHeader } from "../components/OrderDetailsHeader";

export function OrderDetails() {
  const navigate = useNavigate();
  const {
    productsCart,
    setProductsCart,
    totalProductsCost,
    products,
    clearCart,
    getProductById,
    setIsLoginPopupOpen,
    setIsSignupPopupOpen,
    setShowMenu,
    remainingDrinksForReward,
  } = useContext(BubbleTeaContext);
  const { userName, isLogged } = useContext(UserContext);

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

  const removeCartItem = (index: number) => {
    setProductsCart((prev) => {
      const newProductsCart = [...prev];
      newProductsCart.splice(index, 1);
      return newProductsCart;
    });
  };

  const onConfirmOrder = () => {
    if (isLogged) {
      uploadOrder().then(() => clearCart());
    } else {
      setIsLoginPopupOpen(true);
      setIsSignupPopupOpen(false);
      setShowMenu(false);
    }
    navigate(paths.myOrders);
  };

  const textBold = { fontWeight: "bold", letterSpacing: "1px" };

  const calculateTotalDrinks = (): number => {
    return productsCart.reduce((total, item) => total + item.productAmount, 0);
  };

  const hasReward = remainingDrinksForReward <= calculateTotalDrinks();

  const calculateTotalCostWithReward = (): number => {
    if (!hasReward) {
      return totalProductsCost;
    }
    const mostExpensiveProduct = productsCart.reduce((max, item) => {
      const product = getProductById(item.id);
      return product.price > max ? product.price : max;
    }, 0);
    return totalProductsCost - mostExpensiveProduct;
  };

  if (products.length < 1) return <Loading />;
  return (
    <>
      <OrderDetailsHeader/>
      <div style={{ backgroundColor: "#f1efef" }}>
        <div className="separation-line"></div>
        <div style={{ fontWeight: "bold", fontSize: "1.2em", padding: "25px" }}>
          {productsCart.length ? (
            <Text id={"SUMMARY"} />
          ) : (
            <Text id={"NO_PRODUCTS_IN_THE_CART"} />
          )}
        </div>
        <div>
          {productsCart.map((cartItem, index) => {
            const itemProduct = getProductById(cartItem.id);
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
                      <AttributesList
                        attributes={cartItem.attributes}
                      ></AttributesList>
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
          <div>
            <Text id={"TOTAL"} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "end",
            }}
          >
            <div>{formatPrice(calculateTotalCostWithReward())}</div>
            {hasReward && (
              <div
                style={{
                  padding: "5px 10px",
                  marginBlock: "15px",
                  backgroundColor: "rgba(216, 146, 33, 0.48)",
                  borderRadius: "10px",
                  width: "fit-content",
                }}
              >
                1 free reward
              </div>
            )}
          </div>
        </div>
        <div className="separation-line"></div>
      </div>
      <div style={{ marginBlock: "30px" }}>
        {!!productsCart.length && (
          <Button
            text={<Text id={"CONFIRM_ORDER"} />}
            onClick={onConfirmOrder}
          />
        )}
      </div>
    </>
  );
}
