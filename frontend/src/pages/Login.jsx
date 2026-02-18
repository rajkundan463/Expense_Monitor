import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [isLogin,setIsLogin]=useState(true);
  const [error,setError]=useState(null);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      if(isLogin){
        const res = await api.post("/auth/login",{email,password});
        login(res.data.accessToken,res.data.refreshToken);
        navigate("/");
      } else {
        await api.post("/auth/register",{email,password});
        setIsLogin(true);
      }
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h1>Expense Monitor</h1>
        <p>Elite Finance Dashboard</p>
      </div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isLogin?"Login":"Sign Up"}</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button className="primary-btn">{isLogin?"Login":"Sign Up"}</button>
        <p className="toggle" onClick={()=>setIsLogin(!isLogin)}>
          {isLogin?"Create account":"Already have account?"}
        </p>
      </form>
    </div>
  );
}