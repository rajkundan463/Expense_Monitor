import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard(){

  const { logout } = useContext(AuthContext);

  const [expenses,setExpenses]=useState([]);
  const [summary,setSummary]=useState([]);
  const [page,setPage]=useState(1);
  const [category,setCategory]=useState("");
  const [sort,setSort]=useState("date_desc");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  const fetchExpenses=async()=>{
    setLoading(true);
    try{
      const res = await api.get("/expenses",{params:{page,category,sort}});
      setExpenses(res.data.expenses);
    }catch{
      setError("Failed to load expenses");
    }
    setLoading(false);
  };

  const fetchSummary=async()=>{
    const res = await api.get("/expenses/summary");
    setSummary(res.data);
  };

  useEffect(()=>{
    fetchExpenses();
    fetchSummary();
  },[page,category,sort]);

  const total = expenses.reduce((sum,e)=>sum+e.amount,0);

  const chartData = {
    labels: summary.map(s=>s._id),
    datasets:[{
      data: summary.map(s=>s.total/100),
      backgroundColor:["#3b82f6","#ef4444","#10b981","#f59e0b"]
    }]
  };

  return(
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Expense Monitor</h2>
        <button onClick={logout}>Logout</button>
      </aside>

      <main className="main-content">

        <div className="kpi-grid">
          <div className="kpi-card">
            <h3>Total Spent</h3>
            <p>₹ {total/100}</p>
          </div>
          <div className="kpi-card">
            <h3>Transactions</h3>
            <p>{expenses.length}</p>
          </div>
        </div>

        <div className="card">
          <h3>Add Expense</h3>
          <ExpenseForm refresh={fetchExpenses}/>
        </div>

        <div className="card filters">
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
          </select>

          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="date_desc">Newest</option>
            <option value="date_asc">Oldest</option>
          </select>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <ExpenseList expenses={expenses} refresh={fetchExpenses}/>

        <div className="card chart-card">
          <h3>Category Breakdown</h3>
          <Pie data={chartData}/>
        </div>

        <div className="pagination">
          <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
          <span>Page {page}</span>
          <button onClick={()=>setPage(page+1)}>Next</button>
        </div>

      </main>
    </div>
  );
}

function ExpenseForm({refresh}){
  const [amount,setAmount]=useState("");
  const [category,setCategory]=useState("");
  const [description,setDescription]=useState("");
  const [date,setDate]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await api.post("/expenses",{
      amount:Number(amount)*100,
      category,
      description,
      date
    },{
      headers:{"Idempotency-Key":crypto.randomUUID()}
    });
    refresh();
  };

  return(
    <form className="form-grid" onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
      <input placeholder="Category" onChange={(e)=>setCategory(e.target.value)} />
      <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />
      <input type="date" onChange={(e)=>setDate(e.target.value)} />
      <button className="primary-btn">Add</button>
    </form>
  );
}

function ExpenseList({expenses,refresh}){

  const handleDelete=async(id)=>{
    await api.delete(`/expenses/${id}`);
    refresh();
  };

  return(
    <div className="table-card">
      <h3>Recent Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e=>(
            <tr key={e._id}>
              <td>{e.category}</td>
              <td>₹ {e.amount/100}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>
                <button className="danger-btn" onClick={()=>handleDelete(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}