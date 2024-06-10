import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "./../firebase";

export const updateFirebaseDoc = async (docId: string, arrayName: string, element: string) => {
  const docRef = doc(firebaseDB, "store", docId);

  try {
    await updateDoc(docRef, {
      [arrayName]: arrayUnion(element),
    });
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
