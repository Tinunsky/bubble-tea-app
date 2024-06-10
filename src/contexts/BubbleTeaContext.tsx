import { ReactNode, createContext, useEffect, useState } from "react";
import { ATTRIBUTES } from "../constants/ATTRIBUTES";
import { Product } from "../constants/products.tsx";
import { getFirebaseDoc } from "../utils/getFirebaseDoc.tsx";

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
  productsCart: [],
  setProductsCart: (() => {}) as SetState<CartItem[]>,
  totalProductsCost: 0,
  products: [],
  clearCart: () => {},
  getProductById: ((id) => {}) as (id: string) => Product,
  isTakeAway: false,
  setIsTakeAway: (() => {}) as SetState<boolean>,
  isSipIn: false,
  setIsSipIn: (() => {}) as SetState<boolean>,
  selectedCategory: "All",
  setSelectedCategory: (() => {}) as SetState<string>,

};

export const BubbleTeaContext = createContext(defaultBubbleTeaContext);

export const BubbleTeaProvider = ({ children }: { children: ReactNode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isTakeAway, setIsTakeAway] = useState(false);
  const [isSipIn, setIsSipIn] = useState(false);
  const [productsCart, setProductsCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const defaultProducts: Product[] = [];
  const [products, setProducts] = useState(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchProducts = async () => {
    getFirebaseDoc("products").then((data) => {
      setProducts(data.products);
    });
  };

  const getProductById = (id: string) => {
    return products?.find((product) => product.id === id);
  };

  const totalProductsCost = productsCart.reduce((acc, item) => {
    const itemProduct = getProductById(item.id);
    return acc + item.productAmount * itemProduct?.price;
  }, 0);
  console.log("totalProductsCost", totalProductsCost);
  const isAddedToCart = !!productsCart.length;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsCart));
    fetchProducts();
  }, [productsCart]);

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

  const clearCart = () => {
    setProductsCart([]);
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
        productsCart,
        setProductsCart,
        totalProductsCost,
        products,
        clearCart,
        getProductById,
        isTakeAway,
        setIsTakeAway,
        isSipIn,
        setIsSipIn,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </BubbleTeaContext.Provider>
  );
};
