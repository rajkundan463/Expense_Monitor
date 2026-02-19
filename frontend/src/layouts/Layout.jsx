
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/layout.css";

export default function Layout(){
  const {user,logout}=useAuth();
  return (
    <div className="app">
      <aside className="sidebar glass">
        <h2 className="logo">FinanceX</h2>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/budget">Budget</NavLink>
        {user?.role==="admin" && <NavLink to="/admin">Admin</NavLink>}
        <button onClick={logout}>Logout</button>
      </aside>
      <main className="main">
        <Outlet/>
      </main>
    </div>
  );
}
