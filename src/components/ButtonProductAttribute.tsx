import checkCircle from "../assets/check_circle.svg";

export function ButtonProductAttribute({
  name,
  id,
  setAttributeId,
  selectedId,
}) {
  const isSelected = selectedId === id;

  const clickProductAttribute = () => {
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
