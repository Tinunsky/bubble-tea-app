import { Router } from "./utils/Router";
import { UserProvider } from "./contexts/UserContext";
import { BubbleTeaProvider } from "./contexts/BubbleTeaContext";
import { MenuWrapper } from "./components/MenuWrapper";
import { ScrollToTop } from "./utils/ScrollToTop";

const containerStyle = {
  margin: "auto",
  boxShadow: "rgb(46 7 8) 0px 0px 60px, rgb(46 7 8) 0px 0px 19px",
  overflowX: "hidden",
};

export function App() {
  return (
    <div style={containerStyle} className={`w-[550px] lg:w-[916px]`}>
      <UserProvider>
        <BubbleTeaProvider>
          <MenuWrapper>
            <Router />
          </MenuWrapper>
        </BubbleTeaProvider>
      </UserProvider>
    </div>
  );
}
