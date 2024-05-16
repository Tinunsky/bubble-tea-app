import logoImage from "../../assets/logo_face.jpg";
import { MenuBar } from "../MenuBar";
import {
  containerStyle,
  bodyContainerStyle,
  logoStyle,
  textH1Wrapper,
  textPWrapper,
} from "./homeLayout.style";

export function HomeLayout({ children, title, subtitle }) {
  return (
    <>
      <div style={containerStyle}>
        <div style={bodyContainerStyle}>
          <div className="md:w-1/2 pt-5">
            <MenuBar />
          </div>
          <div className="md:w-1/2 flex justify-end pt-5">
            <img
              src={logoImage}
              style={logoStyle}
              alt="Chinese tofu magician"
              className="logo-image"
            />
          </div>
        </div>
        <div style={textH1Wrapper}>
          <div>{title}</div>
        </div>
        <div style={textPWrapper}>{subtitle}</div>
        <div className="absolute bottom-0 w-full">{children}</div>
      </div>
    </>
  );
}
