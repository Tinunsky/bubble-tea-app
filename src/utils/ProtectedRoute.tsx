import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ isActive }: { isActive: boolean }) {
  const redirectPath = "/unlogged";
  return (
    <>
      {!isActive && <Navigate to={redirectPath} replace />}
      {isActive && <Outlet />}
    </>
  );
}
