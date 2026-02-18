import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterBar from "../components/FilterBar";
import TotalCard from "../components/TotalCard";
import { AuthContext } from "../context/AuthContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/expenses", { params: { category, sort }});
      setExpenses(res.data);
    } catch {
      setError("Failed to load expenses");
    }
    setLoading(false);
  };

  const fetchSummary = async () => {
    const res = await axios.get("/expenses/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [category, sort]);

  const chartData = {
    labels: summary.map(s => s._id),
    datasets: [{ data: summary.map(s => s.total / 100) }]
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <h2>Elite Expense Manager</h2>
        <button className="danger-btn" onClick={logout}>Logout</button>
      </div>

      <ExpenseForm refresh={fetchExpenses} />
      <FilterBar category={category} setCategory={setCategory} sort={sort} setSort={setSort} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <TotalCard expenses={expenses} />
      <ExpenseList expenses={expenses} refresh={fetchExpenses} />

      <div className="glass-card chart-card">
        <h3>Category Breakdown</h3>
        <Pie data={chartData} />
      </div>
    </div>
  );
}