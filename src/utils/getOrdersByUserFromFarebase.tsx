import { doc, getDoc } from "firebase/firestore";
import { firebaseDB, firebaseAuth } from "../firebase";

export function getOrdersByUserFromFarebase() {
  return async () => {
    try {
      const docRef = doc(firebaseDB, "store", "orders");

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const orders = docSnap.data().orders || [];

        const userId = firebaseAuth.currentUser.uid;
        const filteredOrders = orders.filter(
          (order) => order.userId === userId
        );
        console.log("Filtered orders:", filteredOrders);

        return filteredOrders;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
}
