import { useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { UserContext } from "../contexts/UserContext";
import { ItemMenu } from "./ItemMenu";
import presentIcon from "../assets/present_logo.svg";
import englishFlag from "../assets/flag_uk.svg";
import spanishFlag from "../assets/flag_spain.svg";
import instagramIcon from "../assets/instagram_logo.svg";
import orderIcon from "../assets/order_icon.svg";
import { MenuFooter } from "./MenuFooter";
import { Text } from "../components/Text";
import { MenuHeader } from "./MenuHeader";
import { paths } from "../utils/Router";
import { useNavigate } from "react-router-dom";
import { ES_LANG } from "../constants/languageEs";

const containerWidth = 550;
// const menuWidth = Math.round((containerWidth * 2) / 3);
const menuWidth = 306;

export function MenuWrapper({ children }) {
  const { showMenu, setShowMenu, setIsLoginPopupOpen, setIsSignupPopupOpen } =
    useContext(BubbleTeaContext);
  const {
    userNameUpperCase,
    isLogged,
    logOut,
    toggleChangeLanguage,
    language,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setIsSignupPopupOpen(false);
    setShowMenu(false);
  };

  const handleRedirect = (page) => {
    navigate(page);
    setShowMenu(false);
  };

  const menuWrapperStyle = {
    width: "calc(306px + 100dvw)",
    display: "flex",
    position: "relative",
    transition: "all 0.5s ease",
    background: "#a88",
    minHeight: "100dvh",
  };

  return (
    <>
      <div
        className={showMenu ? `left-0` : `-left-[306px] lg:left-0 lg:w-[915px]`}
        style={menuWrapperStyle}
      >
        <div
          style={{
            width: `${menuWidth}px`,
            // maxWidth: "80dvw",
            flex: 1,
            backgroundColor: "#fff",
            borderRight: "2px solid black",
          }}
        >
          <div
            className="lg:fixed"
            style={{
              height: "100dvh",
              width: `${menuWidth}px`,
              // maxWidth: "80dvw",
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
                onClick={() => handleRedirect(paths.myOrders)}
              ></ItemMenu>
              <ItemMenu
                itemName={"Soja Lovers"}
                itemImage={presentIcon}
                onClick={() => handleRedirect(paths.sojaLovers)}
              ></ItemMenu>
              <ItemMenu
                itemName={<Text id={"LANGUAGE"} />}
                // not working english flag
                itemImage={language === ES_LANG ? spanishFlag : englishFlag}
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
          id="routerWrapper"
          className="lg:w-[550px]"
          style={{
            width: "100dvw",
            opacity: showMenu ? 0.7 : 1,
            transition: "opacity 0.5s ease",
            minHeight: "100dvh",
            background: "#ffffff",
          }}
        >
          <div
            className="sm:max-w-[550px]"
            style={{ background: "#ffffff" }}
            onClick={() => showMenu && setShowMenu(false)}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
