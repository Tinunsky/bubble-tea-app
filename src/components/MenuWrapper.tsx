import { useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { UserContext } from "../contexts/UserContext";
import { ItemMenu } from "./ItemMenu";
import presentIcon from "../assets/present_logo.svg";
import languageIcon from "../assets/language_icon.svg";
import instagramIcon from "../assets/instagram_logo.svg";
import orderIcon from "../assets/order_icon.svg";
import { MenuFooter } from "./MenuFooter";
import { EN_LANG } from "../constants/languageEn";
import { ES_LANG } from "../constants/languageEs";
import { Text } from "../components/Text";

const containerWidth = 550;
const menuWidth = Math.round((containerWidth * 2) / 3);

export function MenuWrapper({ children }) {
  const { showMenu } = useContext(BubbleTeaContext);
  const { isLogged, logOut, language, setLanguage } = useContext(UserContext);

  const toggleChangeLanguage = () => {
    if (language === EN_LANG) {
      setLanguage(ES_LANG);
    } else {
      setLanguage(EN_LANG);
    }
  };

  const menuWrapperStyle = {
    width: `${menuWidth + containerWidth}px`,
    display: "flex",
    position: "relative",
    transition: "all 0.5s ease",
    background: "#a88",
    height: "100dvh",
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
            background: "#fff",
            borderRight: "2px solid black",
            height: "100dvh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="header-menu"
            style={{ backgroundColor: "#000000", height: "100px", color: "#fff" }}
          >
            You are not logged in
          </div>
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
        <div
          style={{
            width: `${containerWidth}px`,
            opacity: showMenu ? 0.7 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
