import {  useContext  } from "react";
import { 
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet}
from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const Paths = () => {
  const {auth, verificaToken} = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={<PublicRoute isAuthenticated={auth.logged} />}
      />
      <Route
        path="/"
        element={<PrivateRoute isAuthenticated={auth.logged} />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}  
      />
    
    </Routes>
  );
};

export default Paths;

