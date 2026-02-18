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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post("/auth/login", { email, password });
        login(res.data.token);
        navigate("/");
      } else {
        await axios.post("/auth/register", { email, password });
        setIsLogin(true);
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Elite Expense</h1>
        <p>Manage your finances like a pro.</p>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

          {error && <p className="error">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={loading} className="primary-btn">
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>

          <p className="toggle">
            {isLogin ? "No account?" : "Already have account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
