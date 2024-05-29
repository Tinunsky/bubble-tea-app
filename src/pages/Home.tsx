import presentIcon from "../assets/present_logo.svg";
import repeatIcon from "../assets/repeat_logo.svg";
import deleteImage from "../assets/delete_icon.svg";
import { useContext } from "react";
import { HomeLayout } from "../components/HomeLayout/HomeLayout";
import { UserContext } from "../contexts/UserContext";
import { Text } from "../components/Text";
import { ButtonOrderNow } from "../components/ButtonOrderNow";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { ButtonMyOrder } from "../components/ButtonMyOrder";
import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";

export function Home() {
  const { userNameUpperCase } = useContext(UserContext);
  const { isAddedToCart, clearCart } = useContext(BubbleTeaContext);
  const navigate = useNavigate();


  const handleClick = () => {
    isAddedToCart ? clearCart() : navigate(paths.myOrders)

  }

  return (
    <>
      <HomeLayout
        title={
          <>
            <Text id={"HELLO"} />, <br /> {userNameUpperCase}
          </>
        }
        // Repeat this title in Unlogged
        subtitle={
          <p>
            <Text id={"MADE_WITH_HOMEMADE_PURE_SOY_MILK"} />.
            <br />
            <Text id={"PERFECT_FOR_VEGANS_AND_LACTOSE_INTOLERANT"} />.
          </p>
        }
      >
        {/* part of the accordion to removel as a new component Panel/Section */}
        <div
          style={{
            position: "relative",
            background: "white",
            borderBottom: "0.5px solid #2225",
          }}
        >
          <div style={{ cursor: "pointer", padding: "3px 0" }}>
            <div className="flex items-center mx-5 p-3">
              <img
                src={presentIcon}
                alt="icon"
                style={{ maxWidth: "15px", maxHeight: "15px" }}
              />
              <div style={{ marginLeft: "20px", fontSize: "1.3em" }}>
                {"Soja Lover"}
              </div>
              <div style={{ marginLeft: "auto" }}>
                <img
                  src={presentIcon}
                  alt=""
                  style={{ maxWidth: "15px", maxHeight: "15px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Repeating this button element in Unlogged */}
        <div style={{ padding: "32px", backgroundColor: 'white', cursor: "pointer" }}>
          {isAddedToCart ? <ButtonMyOrder /> : <ButtonOrderNow />}
          <div
            className="flex items-center justify-center mt-5"
            onClick={handleClick}
          >
            <img
              src={isAddedToCart ? deleteImage : repeatIcon}
              style={{ height: "20px", marginRight: "5px" }}
              alt={isAddedToCart ? "delete icon" : "repeat icon"}
            />
            <div style={{ paddingTop: "2px" }}>
              {isAddedToCart ? "Delete order" : <Text id={"REPEAT_AN_ORDER"} />}
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
