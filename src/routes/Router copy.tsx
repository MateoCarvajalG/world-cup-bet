import React, { useEffect, useContext, useState } from "react";
import { 
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet}
from "react-router-dom";
import LoginPage from "../components/LoginPage";
import { AuthContext } from "../context/AuthContext";
import Game from "../views/Game";

const Paths = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
      path="/game"
      element={
          <RequireAuth>
            <Game/>
          </RequireAuth>
      }
      />
    </Routes>
  );
};


function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useContext(AuthContext);
  let location = useLocation();

  if (!user) {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default Paths;

