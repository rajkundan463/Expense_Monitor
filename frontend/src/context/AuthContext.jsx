
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null);

  const login = async(email,password)=>{
    const res=await api.post("/auth/login",{email,password});
    localStorage.setItem("accessToken",res.data.accessToken);
    localStorage.setItem("refreshToken",res.data.refreshToken);
    setUser({role:res.data.role});
  };

  const logout=()=>{
    localStorage.clear();
    setUser(null);
  };

  useEffect(()=>{
    const token=localStorage.getItem("accessToken");
    if(token){
      const decoded=JSON.parse(atob(token.split(".")[1]));
      setUser({role:decoded.role});
    }
  },[]);

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>useContext(AuthContext);
