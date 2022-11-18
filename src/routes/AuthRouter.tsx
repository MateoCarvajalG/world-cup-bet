import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage/>}/>
      <Route
          path="*"
          element={<Navigate to="login" replace/>}  
      />
    </Routes>
  )
}