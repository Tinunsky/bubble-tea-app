import { CSSProperties, useContext, useEffect } from "react";
import closeIcon from "../assets/close_icon_black.svg";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";
import storeIcon from "../assets/store_icon.svg";
import { formatPrice } from "../utils/formatPrice";
import { Text } from "../components/Text";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { AttributesList } from "../components/AttributesList";
import { drinkImages } from "../constants/products";
import bubbleTeaHome from "../assets/home_bubbletea.jpg";
import { Loading } from "../components/Loading";

export const containerStyle: CSSProperties = {
  background: "white",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  display: "flex",
  flexDirection: "column",
};

export function MyOrders() {
  const navigate = useNavigate();
  const { getProductById, setProductsCart, filteredOrdersByUser, fetchOrders } =
    useContext(BubbleTeaContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const repeatOrder = (order) => {
    setProductsCart(order.myOrder);
    navigate(paths.orderDetails);
  };

  const isRecent = (timestamp) => {
    const timeDifference = 1000 * 60 * 10;
    const now = new Date();
    const updatedAt = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );

    console.log("timeDifference", now, updatedAt);
    return updatedAt.getTime() + timeDifference > now.getTime();
  };

  return (
    <>
      <div style={containerStyle}>
        <div
          style={{
            fontSize: "2em",
            fontWeight: "bold",
            padding: "35px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <div>
            <p>
              <Text id={"MY"} />
            </p>
            <p>
              <Text id={"ORDERS"} />.
            </p>
          </div>
          <div>
            <img
              src={closeIcon}
              alt="close"
              style={{
                maxWidth: "20px",
                maxHeight: "20px",
                cursor: "pointer",
              }}
              onClick={() => navigate(paths.home)}
            />
          </div>
        </div>
        {filteredOrdersByUser === undefined && <Loading />}
        {filteredOrdersByUser && (
          <div>
            <div
              style={{ fontWeight: "bold", fontSize: "1.2em", padding: "35px" }}
            >
              {filteredOrdersByUser.length > 0 ? (
                <Text id={"RECENT"} />
              ) : (
                <Text id={"NO_ORDER_HISTORY"} />
              )}
            </div>
            {filteredOrdersByUser
              ?.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds)
              .map((order) => (
                <ul key={order.id}>
                  <div className="short-separation-line"></div>
                  {!!isRecent(order.updatedAt) && (
                    <div
                      style={{
                        borderRadius: "10px",
                        height: "50px",
                        width: "80%",
                        display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        background: `url(${bubbleTeaHome})  0% 16% / 130%`,
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginTop: "20px",
                        }}
                      >
                        IN PREPARATION
                      </div>
                    </div>
                  )}

                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "25px 35px",
                    }}
                  >
                    <img
                      src={
                        drinkImages[
                          getProductById(order.myOrder[0].id).drinkImage
                        ]
                      }
                      alt="product image"
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                    />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <img
                          src={storeIcon}
                          alt="store icon"
                          style={{
                            height: "25px",
                            padding: "5px",
                            marginRight: "5px",
                            backgroundColor: "#f1efef",
                            borderRadius: "3px",
                          }}
                        />
                        <div style={{ margin: "5px", fontWeight: "bolder" }}>
                          {order.takeAway ? (
                            <Text id={"TAKE_AWAY"} />
                          ) : (
                            <Text id={"SIP_IN"} />
                          )}
                        </div>
                        <div style={{ margin: "5px", color: "#817b7a" }}>
                          • {formatPrice(order.totalOrderCost)}
                        </div>
                      </div>

                      <div style={{ marginBlock: "10px" }}>
                        {order.myOrder.map((itemFromOrder, itemFromOrderId) => (
                          <div key={itemFromOrderId}>
                            <div style={{ marginBlock: "10px" }}>
                              <div style={{ display: "flex" }}>
                                <div>{itemFromOrder.productAmount}</div>
                                <div style={{ marginInline: "2px" }}>x</div>
                                <div>
                                  {getProductById(itemFromOrder.id).name}
                                </div>
                              </div>
                              <div style={{ display: "flex" }}>
                                <AttributesList
                                  attributes={itemFromOrder.attributes}
                                ></AttributesList>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      onClick={() => repeatOrder(order)}
                      style={{
                        width: "70px",
                        height: "30px",
                        borderRadius: "5px",
                        backgroundColor: "#f1efef",
                        marginBlock: "auto",
                        fontWeight: "bold",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        cursor: "pointer",
                      }}
                    >
                      <Text id={"REPEAT"} />
                    </div>
                  </li>
                </ul>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
