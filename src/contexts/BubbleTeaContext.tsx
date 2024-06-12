import { ReactNode, createContext, useEffect, useState } from "react";
import { ATTRIBUTES } from "../constants/ATTRIBUTES";
import { Product } from "../constants/products.tsx";
import { getFirebaseDoc } from "../utils/getFirebaseDoc.tsx";
import { getOrdersByUserFromFirebase } from "../utils/getOrdersByUserFromFirebase.tsx";
import { Timestamp } from "firebase/firestore";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Attribute = (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES];

export type CartItem = {
  id: string;
  productAmount: number;
  attributes: Attribute[];
};

type Order = {
  id: string;
  fullName: string;
  isPaid: boolean;
  myOrder: CartItem[];
  takeAway: boolean;
  totalOrderCost: number;
  updatedAt: Timestamp;
  userId: string;
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
  getProductById: ((id) => {console.log(id)}) as (id: string) => Product,
  isTakeAway: false,
  setIsTakeAway: (() => {}) as SetState<boolean>,
  isSipIn: false,
  setIsSipIn: (() => {}) as SetState<boolean>,
  selectedCategory: "All",
  setSelectedCategory: (() => {}) as SetState<string>,
  filteredOrdersByUser: [] as Order[],
  isNextFree: false,
  stamps: [],
  emptyStamps: 0,
  fetchOrders: () => {},
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

  const [filteredOrdersByUser, setFilteredOrdersByUser] = useState(undefined);

  const getOrdersByUser = getOrdersByUserFromFirebase();
  const fetchOrders = async () => {
    const userOrders = await getOrdersByUser();
    setFilteredOrdersByUser(userOrders);
  };

  console.log("filteredOrdersByUser", filteredOrdersByUser);
  const getTotalOrderedDrinksAmount = () => {
    let totalAmount = 0;
    filteredOrdersByUser?.forEach((order) =>
      order.myOrder.forEach(
        (orderItem) => (totalAmount += orderItem.productAmount)
      )
    );
    return totalAmount;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stamps = [];
  const maxStamps = 10;
  const totalOrderedDrinksAmount = getTotalOrderedDrinksAmount();
  const rewardRemainder = (totalOrderedDrinksAmount + 1) % 11;
  const stampedNumber = totalOrderedDrinksAmount % 11;
  const emptyStamps = maxStamps - stampedNumber;
  const isNextFree = rewardRemainder === 0;

  for (let i = 0; i < stampedNumber; i++) {
    console.log(i);
    stamps.push(true);
  }
  for (let i = 0; i < emptyStamps; i++) {
    stamps.push(false);
  }

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
        filteredOrdersByUser,
        isNextFree,
        stamps,
        emptyStamps,
        fetchOrders,
      }}
    >
      {children}
    </BubbleTeaContext.Provider>
  );
};
