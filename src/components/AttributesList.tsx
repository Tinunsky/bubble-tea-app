import arrowOptions from "../assets/arrow_options.svg";
import { Text } from "./Text";

export function AttributesList({ attributes }) {
  return (
    <div>
      {attributes.map((attribute, key) => (
        <div
          key={key}
          style={{
            display: "flex",
          }}
        >
          <img
            src={arrowOptions}
            alt="extra options"
            style={{
              height: "19px",
            }}
          />
          <Text id={attribute} />
        </div>
      ))}
    </div>
  );
}
