import { getAuth, signOut } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { EN_LANG } from "../constants/languageEn";
import { ES_LANG } from "../constants/languageEs";

type UserContextType = {
  logIn: (name: string, userId: string) => void;
  logOut: () => void;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  userNameUpperCase: string;
  toggleChangeLanguage: React.Dispatch<React.SetStateAction<string>>;
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
  userNameUpperCase: "",
  toggleChangeLanguage: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const storedDisplayUserName = localStorage.getItem("userName") ? true : false
  const [isLogged, setIsLogged] = useState(storedDisplayUserName);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const userNameUpperCase = userName?.split(" ")[0].toUpperCase();
  const initialLanguage = localStorage.getItem("language") || EN_LANG;
  const [language, setLanguage] = useState(initialLanguage );
  

  useEffect(() => {
      localStorage.setItem("language", initialLanguage);
  }, []);

  function logIn(name, id) {
    if (isLogged === false) {
      setIsLogged(true);
      setUserName(name);
      localStorage.setItem("userName", name);
      localStorage.setItem("userId", id);
    }
  }

  const toggleChangeLanguage = () => {
    let targetLanguage = language;

    if (language === EN_LANG) {
      targetLanguage = ES_LANG;
    } else {
      targetLanguage = EN_LANG;
    }

    localStorage.setItem("language", targetLanguage);
    setLanguage(targetLanguage);
  };

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
        userNameUpperCase,
        toggleChangeLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
