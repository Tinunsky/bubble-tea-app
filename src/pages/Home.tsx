import presentIcon from "../assets/present_logo.svg";
import repeatIcon from "../assets/repeat_logo.svg";
import arrowRight from "../assets/arrow_right.svg";
import { Button } from "../components/Button";
import { useContext } from "react";
import { HomeLayout } from "../components/HomeLayout/HomeLayout";
import { UserContext } from "../contexts/UserContext";
import { Text } from "../components/Text";

export function Home() {
  const { userName } = useContext(UserContext);
  const userNameUpperCase = userName.split(" ")[0].toUpperCase();

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
        {/* <Accordion img={presentIcon} title={"Soja Lover"} /> */}

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
        <div className="p-8 bg-white">
          <Button text={<Text id={"ORDER_NOW"} />} icon={arrowRight} inverted />
          <div className="flex items-center justify-center mt-5">
            <img
              src={repeatIcon}
              style={{ width: "15px", height: "15px" }}
              alt="repeat icon"
            />
            <div style={{ paddingTop: "2px" }}>
              <Text id={"REPEAT_AN_ORDER"} />
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
