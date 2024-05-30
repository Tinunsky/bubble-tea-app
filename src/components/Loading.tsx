import bubbleTea from "../assets/product_soy.png";

export function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={bubbleTea}
          alt="close"
          style={{
            height: "150px",
          }}
        />
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.3em",
            marginInline: "auto",
            marginTop: "20px",
          }}
        >
          Loading ...
        </div>
      </div>
    </div>
  );
}
