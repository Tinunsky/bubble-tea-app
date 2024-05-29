import { Router } from "./utils/Router";
import { UserProvider } from "./contexts/UserContext";
import { BubbleTeaProvider } from "./contexts/BubbleTeaContext";
import { MenuWrapper } from "./components/MenuWrapper";
import { ScrollToTop } from "./utils/ScrollToTop";
import { BrowserRouter } from "react-router-dom";

const containerStyle = {
  margin: "auto",
  boxShadow: "rgb(46 7 8) 0px 0px 60px, rgb(46 7 8) 0px 0px 19px",
  overflowX: "hidden",
};

export function App() {
  return (
    <div
      style={containerStyle}
      className={`xs:w-[100dvw] sm:w-[550px] lg:w-[856px]`}
    >
      <UserProvider>
        <BubbleTeaProvider>
          <BrowserRouter>
            <MenuWrapper>
              <Router />
            </MenuWrapper>
          </BrowserRouter>
        </BubbleTeaProvider>
      </UserProvider>
    </div>
  );
}
