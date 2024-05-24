import { Navigate, Outlet } from "react-router-dom";
import { paths } from "./Router";

export function ProtectedRoute({ isActive }: { isActive: boolean }) {
  const redirectPath = paths.unlogged;
  return (
    <>
      {!isActive && <Navigate to={redirectPath} replace />}
      {isActive && <Outlet />}
    </>
  );
}
