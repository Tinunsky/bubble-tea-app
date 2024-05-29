import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "./../firebase";

export const getFirebaseDoc = async (docId) => {
  const docRef = doc(firebaseDB, "store", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
