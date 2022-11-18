import { Navigate } from 'react-router-dom'
import { AuthRouter } from './AuthRouter';

export const PublicRoute = ({ isAuthenticated }:any) => {
  return !isAuthenticated ? <AuthRouter /> : <Navigate to="/" />;
};
