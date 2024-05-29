import { useEffect, useState } from "react";
import closeIcon from "../assets/close_icon_black.svg";
import { getOrdersByUserFromFarebase } from "../utils/getOrdersByUserFromFarebase";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";
import storeIcon from "../assets/store_icon.svg";
import { formatPrice } from "../utils/formatPrice";

export const containerStyle = {
  background: "white",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  // height: "100dvh",
  display: "flex",
  flexDirection: "column",
};

export function MyOrders() {
  const [filteredOrdersByUder, setFilteredOrdersByUser] = useState([]);
  const getOrdersByUser = getOrdersByUserFromFarebase();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await getOrdersByUser();
      setFilteredOrdersByUser(userOrders);
    };
    fetchOrders();
  }, []);

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
            <p>MY</p>
            <p>ORDERS.</p>
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

        {filteredOrdersByUder && (
          <div>
            <div
              style={{ fontWeight: "bold", fontSize: "1.2em", padding: "35px" }}
            >
              {filteredOrdersByUder.length > 0 ? "Recent" : "No order history"}
            </div>

                        {/* <div>
                    {order.fullName} - {order.takeAway ? "Take Away" : "Eat In"}{" "}
                    - Order number {order.id} -
                    {order.isPaid ? "Payed" : "Pay at local"} -
          </div>  */}


            {filteredOrdersByUder?.map((order) => (
              <ul>
                <div className="short-separation-line"></div>
                <li
                  key={order.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "35px",
                  }}
                >
                  <div>order.image</div>
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
                          marginRight: "10px",
                          backgroundColor: "#f1efef",
                          borderRadius: "3px",
                        }}
                      />
                      <div style={{margin: "5px"}}>{order.takeAway ? "Take Away" : "Sip In"}</div>
                      <div>order.price</div>
                    </div>
                    <div>order.items</div>
                    <div>date</div>
                  </div>
                  <div>button</div>
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
