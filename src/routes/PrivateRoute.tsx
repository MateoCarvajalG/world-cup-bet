import { Navigate } from 'react-router-dom';
import Game from '../views/Game';

export const PrivateRoute = ({ isAuthenticated }:any) => {
  return isAuthenticated ? <Game /> : <Navigate to="/auth/login" />;
};