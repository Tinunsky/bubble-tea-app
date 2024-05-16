import { ReactNode, createContext, useState } from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const defaultBubbleTeaContext = {
  showMenu: false,
  setShowMenu: (() => {}) as SetState<boolean>,
  toggleShowMenu: () => {},
};

export const BubbleTeaContext = createContext(defaultBubbleTeaContext);

export const BubbleTeaProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <BubbleTeaContext.Provider
      value={{
        showMenu,
        setShowMenu,
        toggleShowMenu,
      }}
    >
      {children}
    </BubbleTeaContext.Provider>
  );
};
