export function ItemMenu({
  itemName,
  itemImage,
  onClick,
}) {
  const itemPanelStyle = {
    fontSize: "1.3em",
    cursor: "pointer",
    display: "flex",
    paddingBlock: "12px",
  };

  return (
    <>
      <div style={itemPanelStyle} onClick={onClick}>
        <img
          src={itemImage}
          alt="icon"
          style={{
            maxWidth: "15px",
            maxHeight: "15px",
            marginRight: "10px",
            marginTop: "3px",
          }}
        />
        {itemName}
      </div>
      <div style={{ borderBottom: "1px solid #2223" }}></div>
    </>
  );
}
