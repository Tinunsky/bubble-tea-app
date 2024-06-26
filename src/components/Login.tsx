import { Button } from "./Button";
import closeIcon from "../assets/close_icon_black.svg";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { CSSProperties, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Text } from "../components/Text";
import googleIcon from "../assets/google_logo.svg";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { paths } from "../utils/Router";

export const containerStyle: CSSProperties = {
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

export function Login({ onClose, openSignUp, singInWithGoogle }) {
  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");
  const { logIn } = useContext(UserContext);
  const { setIsLoginPopupOpen } = useContext(BubbleTeaContext);
  const navigate = useNavigate();

  const signInWithCredentials = async () => {
    console.log("password", passwordLogIn);
    console.log("email", emailLogIn);
    try {
      const resp = await signInWithEmailAndPassword(
        firebaseAuth,
        emailLogIn,
        passwordLogIn
      );
      logIn(resp.user.displayName, resp.user.uid);
      setIsLoginPopupOpen(false);
      navigate(paths.home);
      console.log("resp", resp);
      return resp.user.uid;
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, emailLogIn);
      window.alert("Email sent. Check your mailbox.");
    } catch (e) {
      if (e.code === "auth/missing-email") {
        alert("Error: Fill in your email in the form first.");
      } else {
        alert((e as Error).message);
      }
    }
  };

  return (
    <div style={containerStyle} className="fade-in">
      <div
        style={{
          fontSize: "2em",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p>
            <Text id={"WELCOME"} />
          </p>
          <p>
            <Text id={"BACK"} />!
          </p>
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
        <h3>
          <Text id={"EMAIL"} />
        </h3>
        <input
          type="text"
          placeholder={Text({ id: "YOUR_EMAIL_ACCOUNT" })}
          value={emailLogIn}
          onChange={(e) => setEmailLogIn(e.target.value)}
        />
        <h3>
          <Text id={"PASSWORD"} />
        </h3>
        <input
          type="password"
          placeholder={Text({ id: "YOUR_PASSWORD" })}
          value={passwordLogIn}
          onChange={(e) => setPasswordLogIn(e.target.value)}
        />
        <Button text={<Text id={"LOG_IN"} />} onClick={signInWithCredentials}>
        </Button>
        <Button
          text={<Text id={"LOGIN_WITH_GOOGLE"} />}
          secondary
          icon={googleIcon}
          onClick={singInWithGoogle}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{ color: "#3e3737", margin: "10px", cursor: "pointer" }}
          onClick={resetPassword}
        >
          <Text id={"CANT_REMEBER_MY_PASSWORD"} />
        </div>
        <div style={{ cursor: "pointer" }} onClick={openSignUp}>
          <Text id={"DONT_HAVE_AN_ACCOUNT_CREATE_ONE"} />
          <b>
            <Text id={"HERE"} />
          </b>
          .
        </div>
      </div>
    </div>
  );
}
