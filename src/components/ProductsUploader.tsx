import { doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "./../firebase";
import { Product } from "../constants/products";

export const ProductsUploader = () => {
  const uploadProducts = async () => {
    // Specify the document to update
    const docRef = doc(firebaseDB, "store", "products"); // Replace 'yourDocumentId' with the actual document ID

    try {
      // Update the document with the new products array
      await setDoc(docRef, { products: products }, { merge: true });
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return <div onClick={uploadProducts}>Upload!!</div>;
};

const products: Product[] = [
  {
    id: "1",
    category: "Super",
    drinkImage: "productSuper",
    flavourImage: "strawberryBackground",
    name: "Super strawberry",
    description: "STRAWBERRY_DESCRIPTION",
    price: 6.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "2",
    category: "Super",
    drinkImage: "productSuper",
    flavourImage: "bananaBackground",
    name: "Super banana",
    description: "BANANA_DESCRIPTION",
    price: 6.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "3",
    category: "Super",
    drinkImage: "productSuper",
    flavourImage: "mangoBackground",
    name: "Super mango",
    description: "MANGO_DESCRIPTION",
    price: 6.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "4",
    category: "Super",
    drinkImage: "productSuper",
    flavourImage: "taroMatchaBackground",
    name: "Taro matcha",
    description: "TARO_MATCHA_DESCRIPTION",
    price: 6.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "5",
    category: "Super",
    drinkImage: "productSuper",
    flavourImage: "taroBackground",
    name: "Super taro",
    description: "TARO_DESCRIPTION",
    price: 6.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "6",
    category: "Super",
    drinkImage: "productSuper",
    flavourImage: "mangoGrapefruitBackground",
    name: "Mango grapefruit",
    description: "MANGO_GRAPEFRUIT_DESCRIPTION",
    price: 6.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "7",
    category: "Fresh",
    drinkImage: "productFresh",
    flavourImage: "peachBackground",
    name: "Yakult with peach",
    description: "YAKULT_PEACH_DESCRIPTION",
    price: 5.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "8",
    category: "Fresh",
    drinkImage: "productFresh",
    flavourImage: "litchiBackground",
    name: "Yakult with litchi",
    description: "YAKULT_LITCHI_DESCRIPTION",
    price: 5.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "9",
    category: "Fresh",
    drinkImage: "productFresh",
    flavourImage: "grapefruitBackground",
    name: "Yakult with grapefruit",
    description: "YAKULT_GRAPEFRUIT_DESCRIPTION",
    price: 5.5,
    attributes: { hot: false, cold: true },
  },
  {
    id: "10",
    category: "Fresh",
    drinkImage: "productFresh",
    flavourImage: "passionFruitBackground",
    name: "Yakult with passion fruit",
    description: "YAKULT_PASSION_FRUIT_DESCRIPTION",
    price: 5.0,
    attributes: { hot: false, cold: true },
  },
  {
    id: "11",
    category: "Latte",
    drinkImage: "productSuper",
    flavourImage: "soyMilkBackground",
    name: "Soy milk",
    description: "SOY_MILK_DESCRIPTION",
    price: 3.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: "12",
    category: "Latte",
    drinkImage: "productLatte",
    flavourImage: "jasmineBackground",
    name: "Jasmine latte",
    description: "JASMINE_LATTE_DESCRIPTION",
    price: 4.0,
    attributes: { hot: true, cold: true },
  },
  {
    id: "13",
    category: "Latte",
    drinkImage: "productLatte",
    flavourImage: "blackTeaBackground",
    name: "Black tea latte",
    description: "BLACK_TEA_LATTE_DESCRIPTION",
    price: 4.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: "14",
    category: "Latte",
    drinkImage: "productMatchaLatte",
    flavourImage: "matchaBackground",
    name: "Matcha latte",
    description: "MATCHA_LATTE_DESCRIPTION",
    price: 4.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: "15",
    category: "Latte with cream",
    drinkImage: "productWithCream",
    flavourImage: "blackTeaBackground",
    name: "Black tea with cream",
    description: "BLACK_TEA_WITH_CREAM_DESCRIPTION",
    price: 4.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: "16",
    category: "Latte with cream",
    drinkImage: "productWithCream",
    flavourImage: "jasmineBackground",
    name: "Jasmine with cream",
    description: "JASMINE_WITH_CREAM_DESCRIPTION",
    price: 4.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: "17",
    category: "Latte with cream",
    drinkImage: "productWithCream",
    flavourImage: "oolongBackground",
    name: "Oolong with cream",
    description: "OOLONG_WITH_CREAM_DESCRIPTION",
    price: 5.0,
    attributes: { hot: true, cold: true },
  },
];
