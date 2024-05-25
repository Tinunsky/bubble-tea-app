import { ReactNode, createContext, useState } from "react";
import { ATTRIBUTES } from "../constants/ATTRIBUTES";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Attribute = (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES];

export type CartItem = {
  id: string;
  productAmount: number;
  attributes: Attribute[];
};

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
  isAddedToCart: false,
  setIsAddedToCart: (() => {}) as SetState<boolean>,
  totalCartPrice: 0,
  setTotalCartPrice: (() => {}) as SetState<number>,
  productsCart: [],
  setProductsCart: (() => {}) as SetState<CartItem[]>,
};

export const BubbleTeaContext = createContext(defaultBubbleTeaContext);

export const BubbleTeaProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [productsCart, setProductsCart] = useState([]);

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
        isAddedToCart,
        setIsAddedToCart,
        totalCartPrice,
        setTotalCartPrice,
        productsCart,
        setProductsCart,
      }}
    >
      {children}
    </BubbleTeaContext.Provider>
  );
};
