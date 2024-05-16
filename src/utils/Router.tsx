import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { useContext } from "react";
import { Unlogged } from "../pages/Unlogged";
import { SojaLovers } from "../pages/Sojalovers";
import { UserContext } from "../contexts/UserContext";

export function Router() {
  const { isLogged } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isActive={isLogged} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/unlogged" element={<Unlogged />} />
        <Route path="/soja-lovers" element={<SojaLovers />} />
      </Routes>
    </BrowserRouter>
  );
}
