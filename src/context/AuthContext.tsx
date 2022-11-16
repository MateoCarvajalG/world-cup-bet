import React,{ useState } from "react";
import { authService } from "../services/auth.service";
export const AuthContext = React.createContext<any>(null!);

interface AuthContextType {
  user: any;
  signin: (user: string) => void;
  signout: () => void;
}

export const  AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

  let [user, setUser] = React.useState<any>(null);
  const service = new authService()

  let signin = async (Credentials: string) => {
    const user = await service.signIn(Credentials)
    setUser(user!.data)
    return user!.data
  };

  let signout = () => {
    service.signOut()
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}