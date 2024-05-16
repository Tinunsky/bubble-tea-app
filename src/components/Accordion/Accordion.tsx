import arrowDown from "../../assets/arrow_down.svg";
import arrowUp from "../../assets/arrow_up.svg";
import {
  Wrapper,
  headerStyle,
  arrowStyle,
  contentWrapperStyle,
} from "./accordion.style.ts";

export function Accordion({
  children,
  img,
  title,
  contentHeight = "150px",
  expanded,
  toggleExpansion,
}) {
  return (
    <Wrapper>
      <div style={headerStyle} onClick={toggleExpansion}>
        <div className="flex items-center mx-5 p-3">
          <img
            src={img}
            alt="icon"
            style={{ maxWidth: "15px", maxHeight: "15px" }}
          />
          <div style={{ marginLeft: "20px", fontSize: "1.3em" }}>{title}</div>
          <div style={{ marginLeft: "auto" }}>
            <img
              src={expanded ? arrowUp : arrowDown}
              alt={expanded ? "arrow up" : "arrow down"}
              style={arrowStyle}
            />
          </div>
        </div>
      </div>
      <div style={contentWrapperStyle(expanded, contentHeight)}>
        <div className="mx-5 p-3">{children}</div>
      </div>
    </Wrapper>
  );
}









