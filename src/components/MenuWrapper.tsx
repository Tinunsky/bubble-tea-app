import { useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { UserContext } from "../contexts/UserContext";
import { ItemMenu } from "./ItemMenu";
import presentIcon from "../assets/present_logo.svg";
import languageIcon from "../assets/language_icon.svg";
import instagramIcon from "../assets/instagram_logo.svg";
import orderIcon from "../assets/order_icon.svg";
import { MenuFooter } from "./MenuFooter";

import { Text } from "../components/Text";
import { MenuHeader } from "./MenuHeader";

const containerWidth = 550;
const menuWidth = Math.round((containerWidth * 2) / 3);

export function MenuWrapper({ children }) {
  const { showMenu, setShowMenu, setIsLoginPopupOpen, setIsSignupPopupOpen } =
    useContext(BubbleTeaContext);
  const { userNameUpperCase, isLogged, logOut, toggleChangeLanguage } =
    useContext(UserContext);

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setIsSignupPopupOpen(false);
    setShowMenu(false);
  };

  const menuWrapperStyle = {
    width: `${menuWidth + containerWidth}px`,
    display: "flex",
    position: "relative",
    transition: "all 0.5s ease",
    background: "#a88",
    minHeight: "100dvh",
  };

  return (
    <>
      <div
        className={showMenu ? `left-0` : `-left-2/3 lg:left-0`}
        style={menuWrapperStyle}
      >
        <div
          style={{
            width: `${menuWidth}px`,
            flex: 1,
            backgroundColor: "#fff",
            borderRight: "2px solid black",
          }}
        >
          <div
            className="lg:fixed"
            style={{
              // position: showMenu ? "fixed" : "inherit",

              height: "100dvh",
              width: `${menuWidth}px`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* See how to get access to toggleLoginPopup from Unlogged component */}
            <MenuHeader
              buttonOnClick={isLogged ? () => {} : openLoginPopup}
              text={
                isLogged ? (
                  userNameUpperCase
                ) : (
                  <>
                    <Text id={"YOU_ARE_NOT"} />
                    <br />
                    <Text id={"LOGGED_IN"} />
                  </>
                )
              }
              textButton={isLogged ? " " : <Text id={"LOG_IN"} />}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "30px",
                flex: 1,
                justifyContent: "space-around",
              }}
            >
              <div></div>
              <ItemMenu
                itemName={<Text id={"MY_ORDERS"} />}
                itemImage={orderIcon}
                onClick={() => window.alert("Redirect")}
              ></ItemMenu>
              <ItemMenu
                itemName={"Soja Lovers"}
                itemImage={presentIcon}
                onClick={() => window.alert("Redirect")}
              ></ItemMenu>
              <ItemMenu
                itemName={<Text id={"LANGUAGE"} />}
                itemImage={languageIcon}
                onClick={toggleChangeLanguage}
              ></ItemMenu>
              <ItemMenu
                itemName={<Text id={"FOLLOW_US"} />}
                itemImage={instagramIcon}
                onClick={() =>
                  (window.location.href =
                    "https://www.instagram.com/chinesetofumagician/?hl=en")
                }
              ></ItemMenu>
              <MenuFooter isLogged={isLogged} logOut={logOut} />
            </div>
          </div>
        </div>
        <div
          style={{
            width: `${containerWidth}px`,
            opacity: showMenu ? 0.7 : 1,
            transition: "opacity 0.5s ease",
            minHeight: "100dvh",
            background: "#ffffff",
          }}
        >
          <div style={{ background: "#ffffff" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
