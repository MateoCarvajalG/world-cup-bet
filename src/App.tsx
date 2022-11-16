import 'antd/dist/antd.css'
import './App.css'
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Paths from './routes/Router';

function App() {
  
  return (
  <Paths/>
  )
}

export default App
