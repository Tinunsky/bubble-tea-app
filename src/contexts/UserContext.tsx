import { getAuth, signOut } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
import { EN_LANG } from "../constants/languageEn";

type UserContextType = {
  logIn: (name: string, userId: string) => void;
  logOut: () => void;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
  logIn: () => {},
  logOut: () => {},
  isLogged: false,
  setIsLogged: () => {},
  userName: "",
  setUserName: () => {},
  language: EN_LANG,
  setLanguage: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const displayUserName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const [isLogged, setIsLogged] = useState(!!displayUserName);
  const [userName, setUserName] = useState(displayUserName);

  const [language, setLanguage] = useState(EN_LANG);

  console.log("userId", userId);

  function logIn(name, userId) {
    if (isLogged === false) {
      setIsLogged(true);
      setUserName(name);
      localStorage.setItem("userName", name);
      localStorage.setItem("userId", userId);
    }
  }

  function logOut() {
    if (isLogged === true) {
      setIsLogged(false);

      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.setItem("userName", "");
          localStorage.setItem("userId", "");
        })
        .catch((error) => {});
    }
  }

  return (
    <UserContext.Provider
      value={{
        logIn,
        logOut,
        isLogged,
        setIsLogged,
        userName,
        setUserName,
        language,
        setLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
