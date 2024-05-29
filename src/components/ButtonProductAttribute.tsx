import { useState } from "react";
import checkCircle from "../assets/check_circle.svg";

export function ButtonProductAttribute({
  name,
  id,
  setAttributeId,
  selectedId,
}) {
  // const [isClicked, setIsClicked] = useState(false);

  // let isSelected = false;
  // if (selectedId === id) isSelected = true;
  const isSelected = selectedId === id;
  // console.log("id", id);
  // console.log("selectedId", selectedId);
  // console.log("isSelected", isSelected);

  // console.log("-------------------");
  const clickProductAttribute = () => {
    // setIsClicked(!isClicked);
    setAttributeId(id);
  };

  return (
    <>
      <button
        style={{
          height: "50px",
          width: "140px",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: isSelected ? "#d892217a" : "#ebe2e2",
          border: isSelected ? "" : "1px solid #e7dbdb",
          margin: "10px",
          position: "relative",
        }}
        onClick={clickProductAttribute}
      >
        {isSelected && (
          <img
            src={checkCircle}
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "25px",
              height: "25px",
            }}
            alt="check circle"
          />
        )}
        {name}
      </button>
    </>
  );
}
