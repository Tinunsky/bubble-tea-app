import productSuper from "../assets/product_super.png";
import productFresh from "../assets/product_fresh.png";
import productWithCream from "../assets/product_with_cream.png";
import productMatchaLatte from "../assets/product_matcha_latte.png";
import productLatte from "../assets/product_latte.png";
import strawberryBackground from "../assets/strawberry_background.jpg";
import bananaBackground from "../assets/banana_background.jpg";
import mangoBackground from "../assets/mango_background.jpg";
import taroBackground from "../assets/taro_background.jpg";
import taroMatchaBackground from "../assets/taro_matcha_background.jpg";
import mangoGrapefruitBackground from "../assets/mango_grapefruit_background.jpeg";
import soyMilkBackground from "../assets/soy_milk_background.jpg";
import peachBackground from "../assets/peach_background.jpg";
import litchiBackground from "../assets/litchi_background.jpg";
import grapefruitBackground from "../assets/grapefruit_background.jpg";
import passionFruitBackground from "../assets/passion_fruit_background.jpg";
import jasmineBackground from "../assets/jasmine_background.jpg";
import blackTeaBackground from "../assets/black_tea_background.jpg";
import matchaBackground from "../assets/matcha_background.webp";
import oolongBackground from "../assets/oolong_background.jpg";

export const flavourImages = {
  strawberryBackground,
  bananaBackground,
  mangoBackground,
  taroBackground,
  taroMatchaBackground,
  mangoGrapefruitBackground,
  soyMilkBackground,
  productSuper,
  peachBackground,
  litchiBackground,
  grapefruitBackground,
  passionFruitBackground,
  jasmineBackground,
  blackTeaBackground,
  matchaBackground,
  oolongBackground,
};

export const drinkImages = {
  productSuper,
  productFresh,
  productWithCream,
  productMatchaLatte,
  productLatte,
};

export type Product = {
  id: string,
  category: string,
  drinkImage: string,
  flavourImage: string,
  name: string,
  description: string,
  price: number,
  attributes: { hot: boolean, cold: boolean },
};