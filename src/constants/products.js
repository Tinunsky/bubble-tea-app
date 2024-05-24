import productImage from "../assets/product_soy.png";
import strawberryBackground from "../assets/strawberry_background.jpg";
import bananaBackground from "../assets/banana_background.jpg";
import mangoBackground from "../assets/mango_background.jpg";
import taroBackground from "../assets/taro_background.jpg";
import taroMatchaBackground from "../assets/taro_matcha_background.avif";
import mangoGrapefruitBackground from "../assets/mango_grapefruit_background.jpeg";
import soyMilkBackground from "../assets/soy_milk_background.jpg";



export const products = [
  {
    id: 1,
    category: "Super",
    drinkImage: productImage,
    flavourImage: strawberryBackground,
    name: "Super strawberry",
    description: "Strawberries blended with soy milk and tapioca balls. Options available to serve it cold or hot.",
    price: 6.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: 3,
    category: "Super",
    drinkImage: productImage,
    flavourImage: bananaBackground,
    name: "Super banana",
    description: "Bananas blended with soy milk and tapioca balls. Options available to serve it cold or hot.",
    price: 6.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: 4,
    category: "Super",
    drinkImage: productImage,
    flavourImage: mangoBackground,
    name: "Super mango",
    description: "Mango blended with soy milk and tapioca balls. Options available to serve it cold or hot.",
    price: 6.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: 5,
    category: "Super",
    drinkImage: productImage,
    flavourImage: taroMatchaBackground,
    name: "Taro matcha",
    description: "Taro and matcha powder blended with soy milk and tapioca balls. Options available to serve it cold or hot.",
    price: 6.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: 6,
    category: "Super",
    drinkImage: productImage,
    flavourImage: taroBackground,
    name: "Super taro",
    description: "Taro powder blended with soy milk and tapioca balls. Options available to serve it cold or hot.",
    price: 6.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: 7,
    category: "Super",
    drinkImage: productImage,
    flavourImage: mangoGrapefruitBackground,
    name: "Mango grapefruit",
    description: "Mango and grapefruit blended with soy milk and tapioca balls. Options available to serve it cold or hot.",
    price: 6.5,
    attributes: { hot: true, cold: true },
  },
  {
    id: 2,
    category: "Latte",
    drinkImage: productImage,
    flavourImage: soyMilkBackground,
    name: "Soy milk",
    description: "bla bla",
    price: 3.5,
    attributes: { hot: true, cold: true },
  },

];
