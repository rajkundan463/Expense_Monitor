import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = await axios.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } else {
      await axios.post("/auth/register", { email, password });
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button>{isLogin ? "Login" : "Register"}</button>
        <p onClick={()=>setIsLogin(!isLogin)} className="toggle">
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </form>
    </div>
  );
}