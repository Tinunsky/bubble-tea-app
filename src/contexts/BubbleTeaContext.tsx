import { ReactNode, createContext, useState } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const defaultBubbleTeaContext = {
  showMenu: false,
  setShowMenu: (() => {}) as SetState<boolean>,
  toggleShowMenu: () => {},
  isLoginPopupOpen: false,
  setIsLoginPopupOpen: (() => {}) as SetState<boolean>,
  toggleLoginPopup: () => {},
  isSignupPopupOpen: false,
  setIsSignupPopupOpen: (() => {}) as SetState<boolean>,
  toggleSignupPopup: () => {},
};

export const BubbleTeaContext = createContext(defaultBubbleTeaContext);

export const BubbleTeaProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
    setIsSignupPopupOpen(false);
  };

  const toggleSignupPopup = () => {
    setIsSignupPopupOpen(!isSignupPopupOpen);
    setIsLoginPopupOpen(false);
  };

  return (
    <BubbleTeaContext.Provider
      value={{
        showMenu,
        setShowMenu,
        toggleShowMenu,
        isLoginPopupOpen,
        setIsLoginPopupOpen,
        toggleLoginPopup,
        isSignupPopupOpen,
        setIsSignupPopupOpen,
        toggleSignupPopup,
      }}
    >
      {children}
    </BubbleTeaContext.Provider>
  );
};
