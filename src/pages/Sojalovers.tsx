import { useNavigate } from "react-router-dom";
import closeIcon from "../assets/close_icon_black.svg";
import { paths } from "../utils/Router";
import { CSSProperties, useEffect, useState } from "react";
import { Text } from "../components/Text";
import bubbleTeaHome from "../assets/home_bubbletea.jpg";
import logoImage from "../assets/logo_face.jpg";
import { getOrdersByUserFromFirebase } from "../utils/getOrdersByUserFromFirebase";

export const containerStyle: CSSProperties = {
  background: "white",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  height: "100dvh",
  padding: "35px",
  display: "flex",
  flexDirection: "column",
};

export function SojaLovers() {
  const navigate = useNavigate();
  const [filteredOrdersByUser, setFilteredOrdersByUser] = useState([]);
  const getOrdersByUser = getOrdersByUserFromFirebase();

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await getOrdersByUser();
      setFilteredOrdersByUser(userOrders);
    };
    fetchOrders();
  }, []);

  const getTotalOrderedDrinksAmount = () => {
    let totalAmount = 0;
    filteredOrdersByUser.forEach((order) =>
      order.myOrder.forEach(
        (orderItem) => (totalAmount += orderItem.productAmount)
      )
    );
    return totalAmount;
  };

  const stamps = [];
  const maxStamps = 10;
  const totalOrderedDrinksAmount = getTotalOrderedDrinksAmount();
  const remainingDrinksForReward = (totalOrderedDrinksAmount +1) % 11;
  const stampedNumber = (totalOrderedDrinksAmount) % 11;
  const emptyStamps = maxStamps - stampedNumber;
  const isNextFree = remainingDrinksForReward  === 0;

  console.log("stampedNumber", stampedNumber)
  for (let i = 0; i < stampedNumber; i++) {
    console.log(i);
    stamps.push(true);
  }
  for (let i = 0; i < emptyStamps; i++) {
    stamps.push(false);
  }

  return (
    <>
      <div style={containerStyle}>
        <div
          style={{
            fontSize: "2em",
            fontWeight: "bold",

            display: "flex",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <div>
            <p>
              <Text id={"SOJA"} />
            </p>
            <p>
              <Text id={"LOVERS"} />.
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
        <div
          style={{
            borderRadius: "20px",
            height: "300px",
            overflow: "hidden",
            boxShadow: "0px 14px 25px -10px #d892217a",
          }}
        >
          <div
            style={{
              height: "100px",
              background: `url(${bubbleTeaHome})  0% 16% / 130%`,
            }}
          >
            <div style={{ color: "white", padding: "20px" }}>
              <Text id={"ORDER_10_BUBBLE_TEAS"} />
            </div>
          </div>
          <div>
            {stamps.map((stamp) => (
              <div style={{ width: "20%", display: "inline-block" }}>
                <img
                  src={logoImage}
                  style={{
                    width: "80%",
                    margin: "10%",
                    opacity: stamp ? 1 : 0.2,
                  }}
                  alt="Chinese tofu magician"
                />
              </div>
            ))}
          </div>
        </div>
        {isNextFree && (
          <div
            style={{
              margin: "auto",
              fontWeight: "bold",
              fontSize: "1.2em",
            }}
          >
            <Text id="CONGRATULATIONS_YOUVE_EARNED_1_FREE" />
          </div>
        )}
      </div>
    </>
  );
}
