import { useState } from "react";
import checkCircle from "../assets/check_circle.svg"

export function ButtonProductAttribute({ name }) {
  const [isClicked, setIsClicked] = useState(false);

  const chosenProductAttribute = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <button
        style={{
          height: "50px",
          width: "140px",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: isClicked ? "#d892217a" : "#ebe2e2",
          border: isClicked ? "" : "1px solid #e7dbdb",
          margin: "10px",
          position: "relative",
        }}
        onClick={chosenProductAttribute}
      >
        {isClicked && (
   
              <img
              src={checkCircle}
              style={{ position: "absolute", top: "0px", right: "0px", width: "25px", height: "25px"}}
              alt="check circle"
            />

        )}
        {name}
      </button>
    </>
  );
}
