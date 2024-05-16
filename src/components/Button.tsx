export function Button({
  text,
  secondary = false,
  icon = undefined,
  inverted = false,
  onClick,
}) {
  return (
    <div
      style={{
        height: "50px",
        background: secondary ? "white" : "black",
        borderRadius: "50px",
        display: "flex",
        margin: "10px",
        border: "1px solid black",
        alignItems: "center",
        justifyContent: inverted ? "space-between" : "center",
        flexDirection: inverted ? "row-reverse" : "row",
        paddingInline: inverted ? "20px" : 0,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {icon && (
        <img
          src={icon}
          alt="icon"
          style={{ maxWidth: "20px", maxHeight: "20px", marginRight: "5px" }}
        />
      )}
      <div
        style={{
          fontSize: "1.5em",
          color: secondary ? "black" : "white",
        }}
      >
        {text}
      </div>
    </div>
  );
}
