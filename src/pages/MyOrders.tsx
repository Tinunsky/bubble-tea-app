import { useContext, useEffect, useState } from "react";
import closeIcon from "../assets/close_icon_black.svg";
import { getOrdersByUserFromFarebase } from "../utils/getOrdersByUserFromFarebase";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";
import storeIcon from "../assets/store_icon.svg";
import { formatPrice } from "../utils/formatPrice";
import { Text } from "../components/Text";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { AttributesList } from "../components/AttributesList";
import { drinkImages } from "../constants/products";

export const containerStyle = {
  background: "white",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  // height: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export function MyOrders() {
  const [filteredOrdersByUser, setFilteredOrdersByUser] = useState([]);
  const getOrdersByUser = getOrdersByUserFromFarebase();
  const navigate = useNavigate();
  const { getProductById, products } = useContext(BubbleTeaContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await getOrdersByUser();
      setFilteredOrdersByUser(userOrders);
    };
    fetchOrders();
  }, []);

  // if (!filteredOrdersByUser.length && !products.length) return <>Loading...</>;

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
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "35px",
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
      ;
    </>
  );
}
