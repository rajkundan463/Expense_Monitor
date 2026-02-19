import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await login(form.email, form.password);
    } else {
      await api.post("/auth/register", form);
      await login(form.email, form.password);
    }

    navigate("/");
  };

  return (
    <div className="auth-wrapper">

      {/* LEFT BRANDING PANEL */}
      <div className="auth-left">
        <h1 className="brand-title">ExpenseMonitor</h1>
        <p className="brand-tagline">
          Smart financial tracking for modern professionals.
        </p>

        <div className="brand-features">
          <div>✔ Real-time analytics</div>
          <div>✔ Budget alerts</div>
          <div>✔ Enterprise-grade security</div>
          <div>✔ Admin management</div>
        </div>
      </div>

      {/* RIGHT AUTH CARD */}
      <div className="auth-right">
        <div className="auth-card glass">

          <h1 className="auth-heading">
            {isLogin ? "Welcome Back 👋" : "Welcome 👋"}
          </h1>

          <p className="auth-subtitle">
            {isLogin
              ? "Login to continue managing your finances"
              : "Create your account to start tracking"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                required
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button type="submit" className="auth-btn neon-btn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="toggle">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Login"}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
