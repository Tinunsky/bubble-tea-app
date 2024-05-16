import { Button } from "./Button";
import closeIcon from "../assets/close_icon_black.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Text } from "../components/Text";

export const containerStyle = {
  background: "white",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  height: "100dvh",
  padding: "35px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const loginForm = {
  height: "300px",
  marginTop: "50px",
};

export function Signup({ onClose }) {
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [fullNameSignUp, setFullNameSignUp] = useState("");
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const updateProfileWithDisplayName = async () => {
    try {
      const resp = await updateProfile(firebaseAuth.currentUser, {
        displayName: fullNameSignUp,
      });
      console.log("resp", resp);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const createUserWithCredentials = async () => {
    try {
      const resp = await createUserWithEmailAndPassword(
        firebaseAuth,
        emailSignUp,
        passwordSignUp
      );
      console.log("id", resp.user.uid);
      updateProfileWithDisplayName();
      logIn(fullNameSignUp, resp.user.uid);
      navigate("/");
      return resp.user.uid;
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <>
      <div style={containerStyle}>
        <div
          style={{
            fontSize: "2em",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p><Text id={"NICE_TO"} /></p>
            <p><Text id={"MEET_YOU"} />.</p>
          </div>
          <div>
            <img
              src={closeIcon}
              alt="close"
              style={{
                maxWidth: "20px",
                maxHeight: "20px",
                cursor: "pointer",
              }}
              onClick={onClose}
            />
          </div>
        </div>
        <div style={loginForm}>
          <h3>Email</h3>
          <input
            type="text"
            placeholder="Your email account"
            value={emailSignUp}
            onChange={(e) => setEmailSignUp(e.target.value)}
          />
          <h3><Text id={"MAKE_THE_PASSWORD"} /></h3>
          <input
            type="password"
            placeholder="New password"
            value={passwordSignUp}
            onChange={(e) => setPasswordSignUp(e.target.value)}
          />
          {/* {errorLogin && <div style={{ color: "#ff2222" }}>{errorLogin}</div>} */}
          <h3><Text id={"FULL_NAME"} /></h3>
          <input
            type="text"
            placeholder="Your full name"
            value={fullNameSignUp}
            onChange={(e) => setFullNameSignUp(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button text={<Text id={"SIGN_UP"} />} onClick={createUserWithCredentials}>
            {/* <div> {loadingLogin ? "Logging in..." : "Log in"}</div> */}
          </Button>
        </div>
      </div>
    </>
  );
}
