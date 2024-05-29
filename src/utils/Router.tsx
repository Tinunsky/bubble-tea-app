import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { useContext } from "react";
import { Unlogged } from "../pages/Unlogged";
import { SojaLovers } from "../pages/Sojalovers";
import { UserContext } from "../contexts/UserContext";
import { OrderNow } from "../pages/OrderNow";
import { AddProduct } from "../pages/AddProduct";
import { OrderDetails } from "../pages/OrderDetails";
import { ScrollToTop } from "./ScrollToTop";
import { MyOrders } from "../pages/MyOrders";
export const paths = {
  home: "/",
  unlogged: "/unlogged",
  sojaLovers: "/soja-lovers",
  orderNow: "/order-now",
  product: "/product-to-order/:id",
  orderDetails: "/order-details",
  myOrders: "/my-orders",
};

export function Router() {
  const { isLogged } = useContext(UserContext);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoute isActive={isLogged} />}>
          <Route path={paths.home} element={<Home />} />
        </Route>
        <Route path={paths.unlogged} element={<Unlogged />} />
        <Route path={paths.sojaLovers} element={<SojaLovers />} />
        <Route path={paths.myOrders} element={<MyOrders />} />
        <Route path={paths.orderNow} element={<OrderNow />} />
        <Route path={paths.product} element={<AddProduct />} />
        <Route path={paths.orderDetails} element={<OrderDetails />} />
      </Routes>
    </>
  );
}
