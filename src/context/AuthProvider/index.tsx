import React, {createContext, useState, useEffect} from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({children}: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>()

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
    
  }, [])
  

   const authenticate = async (email: string, password: string) => {
    const response = await LoginRequest(email, password)

    const payload = { token: response.token, email }

    setUser(payload);
    setUserLocalStorage(payload);
  }

  // async function authenticate (email: string, password: string) {
  //   const response = await LoginRequest(email, password)

  //   const payload = { token: response.token, email }

  //   setUser(payload);
  // }

  function logout () {
    setUser(null);
    setUserLocalStorage(null);

  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate,  logout}}>
      {children}
    </AuthContext.Provider>
  )

}