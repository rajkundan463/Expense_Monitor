import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterBar from "../components/FilterBar";
import TotalCard from "../components/TotalCard";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchExpenses = async () => {
    const res = await axios.get("/expenses", {
      params: { category, page, limit: 5 }
    });
    setExpenses(res.data.expenses);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchExpenses();
  }, [category, page]);

  return (
    <div className="dashboard">
      <header>
        <h2>Elite Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <TotalCard expenses={expenses} total={total} />
      <ExpenseForm refresh={fetchExpenses} />
      <FilterBar category={category} setCategory={setCategory} />
      <ExpenseList expenses={expenses} refresh={fetchExpenses} />

      <div className="pagination">
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={page*5 >= total} onClick={()=>setPage(page+1)}>Next</button>
      </div>
    </div>
  );
}