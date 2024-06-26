import { Accordion } from "../components/Accordion/Accordion";
import registerIcon from "../assets/user_register_icon.svg";
import loginIcon from "../assets/user_login_icon.svg";
import googleIcon from "../assets/google_logo.svg";
import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { HomeLayout } from "../components/HomeLayout/HomeLayout";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../firebase";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Text } from "../components/Text";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { ButtonOrderNow } from "../components/ButtonOrderNow";
import { paths } from "../utils/Router";

export function Unlogged() {
  const [loginExpanded, setLoginExpanded] = useState(false);
  const [signUpExpanded, setSignUpExpanded] = useState(false);
  const { isLoginPopupOpen, isSignupPopupOpen , toggleLoginPopup, toggleSignupPopup, setIsLoginPopupOpen } = useContext(BubbleTeaContext);
  const { logIn } = useContext(UserContext);

  const toggleLoginExpanded = () => {
    setLoginExpanded(!loginExpanded);
    setSignUpExpanded(false);
  };

  const toggleSignUpExpanded = () => {
    setSignUpExpanded(!signUpExpanded);
    setLoginExpanded(false);
  };

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const singInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);

      const { displayName, uid } = result.user;
      console.log("google user", result.user);
      logIn(displayName, uid);
      setIsLoginPopupOpen(false);
      navigate(paths.home);

      return uid;
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <>
      <HomeLayout
        title={
          <>
            <Text id={"HEALTHIER_OPTIONS"} />, <br /> <Text id={"WITH_EVERY_SIP"}/>.
          </>
        }
        subtitle={
          <p>
            <Text id={"MADE_WITH_HOMEMADE_PURE_SOY_MILK"} />.
            <br />
            <Text id={"PERFECT_FOR_VEGANS_AND_LACTOSE_INTOLERANT"} />.
          </p>
        }
      >
        <Accordion
          img={loginIcon}
          title={<Text id={"LOG_IN"}/>}
          expanded={loginExpanded}
          toggleExpansion={toggleLoginExpanded}
        >
          <Button text={<Text id={"LOGIN_WITH_EMAIL"}/>} onClick={toggleLoginPopup} />
          <Button
            text={<Text id={"LOGIN_WITH_GOOGLE"}/>}
            secondary
            icon={googleIcon}
            onClick={singInWithGoogle}
          />
        </Accordion>
        <Accordion
          img={registerIcon}
          title={<Text id={"SIGN_UP"}/>}
          expanded={signUpExpanded}
          toggleExpansion={toggleSignUpExpanded}
        >
          <Button text={<Text id={"SIGN_UP_WITH_EMAIL"}/>} onClick={toggleSignupPopup} />
          <Button
            text={<Text id={"SIGN_UP_WITH_GOOGLE"}/>}
            secondary
            icon={googleIcon}
            onClick={singInWithGoogle}
          />
        </Accordion>
        <div className="p-8 bg-white">
        <ButtonOrderNow />
        </div>
        {isLoginPopupOpen && (
          <Login onClose={toggleLoginPopup} openSignUp={toggleSignupPopup} singInWithGoogle={singInWithGoogle} />
        )}
        {isSignupPopupOpen && <Signup onClose={toggleSignupPopup} />}
      </HomeLayout>
    </>
  );
}
