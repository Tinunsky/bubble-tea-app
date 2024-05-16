import { useContext } from "react";
import menuScaleIcon from "../assets/menu_scale_icon.svg";
import closeIcon from "../assets/close_icon_white.svg";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";

export function MenuBar() {
  const { showMenu, toggleShowMenu  } = useContext(BubbleTeaContext);
  return (
    <>
      <div className="lg:hidden" style={{cursor: "pointer", paddingLeft: "30px"}} onClick={toggleShowMenu}>
        <img
          src= {showMenu ? closeIcon : menuScaleIcon}
          alt= {showMenu ? "close icon" : "menu scale icon"}
          style={{width: "25px", height: "25px"}}
        />
      </div>
    </>
  );
}
