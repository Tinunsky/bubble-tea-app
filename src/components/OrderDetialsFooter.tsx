import { useNavigate } from "react-router-dom";
import { paths } from "../utils/Router";
import { useContext } from "react";
import { BubbleTeaContext } from "../contexts/BubbleTeaContext";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { updateFirebaseDoc } from "../utils/updateFirebaseDoc";
import { firebaseAuth } from "./../firebase";
import { UserContext } from "../contexts/UserContext";
import { Timestamp } from "firebase/firestore";

export function OrderDetialsFooter() {
  const navigate = useNavigate();
  const {
    setIsLoginPopupOpen,
    setIsSignupPopupOpen,
    setShowMenu,
    clearCart,
    productsCart,
    totalProductsCost,
  } = useContext(BubbleTeaContext);
  const { userName, isLogged } = useContext(UserContext);

  const uploadOrder = async () => {
    const newOrder = {
      id: crypto.randomUUID(),
      userId: firebaseAuth.currentUser.uid,
      fullName: userName,
      updatedAt: Timestamp.now(),
      takeAway: false,
      myOrder: productsCart,
      isPaid: false,
      totalOrderCost: totalProductsCost,
    };
    updateFirebaseDoc("orders", "orders", newOrder);
  };

  const onConfirmOrder = () => {
    if (isLogged) {
      uploadOrder().then(() => clearCart());
    } else {
      setIsLoginPopupOpen(true);
      setIsSignupPopupOpen(false);
      setShowMenu(false);
    }
    navigate(paths.myOrders);
  };

  return (
    <>
      <div style={{ marginBlock: "30px" }}>
        {!!productsCart.length && (
          <Button
            text={<Text id={"CONFIRM_ORDER"} />}
            onClick={onConfirmOrder}
          />
        )}
      </div>
    </>
  );
}
