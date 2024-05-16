import goBackIcon from "../assets/arrow_left.svg";

export const containerStyle = {
  background: "white",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  height: "100dvh",
  padding: "35px",
  display: "flex",
  flexDirection: "column",
};


export function SojaLovers({ onClose }) {
  return (
    <>
      <div style={containerStyle}>
          <img
            src={goBackIcon}
            alt="goBackIcon"
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              cursor: "pointer",
            }}
            onClick={onClose}
          />
          <div style={{backgroundColor: "brown", borderRadius: "20px", height: "250px"}}>
            <div>Logo</div>
            <div>
                
            </div>

          </div>
      </div>
    </>
  );
}
