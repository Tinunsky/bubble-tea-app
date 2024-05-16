import logoImage from "../assets/logo_face.jpg";
import { Text } from "./Text";

export function MenuFooter({
  isLogged,
  logOut,
}: {
  isLogged: boolean;
  logOut: () => void;
}) {
  return (
    <>
      {isLogged && (
        <div
          onClick={logOut}
          style={{
            color: "#fe3917",
            fontSize: "1.3em",
            cursor: "pointer",
          }}
        >
          <Text id={"LOG_OUT"} />
        </div>
      )}
      <div>
        <img
          src={logoImage}
          style={{ borderRadius: "20px", height: "40px" }}
          alt="Chinese tofu magician"
          className="logo-image"
        />
        <p
          style={{
            fontSize: "0.8em",
            color: "#817171",
            padding: "6px",
          }}
        >
          2024
        </p>
      </div>
    </>
  );
}
