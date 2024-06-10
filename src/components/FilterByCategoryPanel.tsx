import { useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";

export function FilterByCategoryPanel() {
  const productCategories = [
    "All",
    "Fresh",
    "Super",
    "Latte",
    "Latte with cream",
  ];

  const { selectedCategory, setSelectedCategory } =
    useContext(BubbleTeaContext);

  return (
    <div
      style={{
        height: "40px",
        borderBottom: "1px solid #2223",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1.1em",
      }}
    >
      {productCategories?.map((category) => (
        <div
          key={crypto.randomUUID()}
          style={{
            cursor: "pointer",
            borderBottom: selectedCategory === category ? "2px solid #000" : "",
            padding: "10px",
          }}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
