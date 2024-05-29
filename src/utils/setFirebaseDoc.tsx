import { doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "./../firebase";

export const setFirebaseDoc = async (docId, data) => {
  const docRef = doc(firebaseDB, "store", docId);

  try {
    await setDoc(docRef, data, { merge: true });
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
