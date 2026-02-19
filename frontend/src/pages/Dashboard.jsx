
import { useEffect,useState } from "react";
import api from "../api/axios";
import { v4 as uuid } from "uuid";

export default function Dashboard(){
  const [expenses,setExpenses]=useState([]);
  const [income,setIncome]=useState([]);
  const [form,setForm]=useState({amount:"",category:"",description:""});
  const [incForm,setIncForm]=useState({amount:"",source:""});

  const load=async()=>{
    const e=await api.get("/expenses");
    const i=await api.get("/income");
    setExpenses(e.data.data||[]);
    setIncome(i.data||[]);
  };

  useEffect(()=>{load();},[]);

  const addExpense=async(e)=>{
    e.preventDefault();
    await api.post("/expenses",{
      ...form,
      amount:parseInt(form.amount),
      idempotencyKey:uuid()
    });
    load();
  };

  const addIncome=async(e)=>{
    e.preventDefault();
    await api.post("/income",{...incForm,amount:parseInt(incForm.amount)});
    load();
  };

  const totalExp=expenses.reduce((a,b)=>a+b.amount,0);
  const totalInc=income.reduce((a,b)=>a+b.amount,0);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="kpi-grid">
        <div className="glass card">Total Expense: ₹{totalExp}</div>
        <div className="glass card">Total Income: ₹{totalInc}</div>
        <div className="glass card">Net: ₹{(totalInc-totalExp)}</div>
      </div>

      <div className="grid-2">
        <form onSubmit={addExpense} className="glass card">
          <h3>Add Expense</h3>
          <input placeholder="Indian Rupee (INR)" onChange={e=>setForm({...form,amount:e.target.value})}/>
          <input placeholder="Category" onChange={e=>setForm({...form,category:e.target.value})}/>
          <input placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})}/>
          <button>Add</button>
        </form>

        <form onSubmit={addIncome} className="glass card">
          <h3>Add Income</h3>
          <input placeholder="Amount (paise)" onChange={e=>setIncForm({...incForm,amount:e.target.value})}/>
          <input placeholder="Source" onChange={e=>setIncForm({...incForm,source:e.target.value})}/>
          <button>Add</button>
        </form>
      </div>

      <div className="glass card">
        <h3>Expenses</h3>
        {expenses.map(e=>(
          <div key={e._id} className="row">
            <span>{e.category}</span>
            <span>₹{e.amount}</span>
            <button onClick={()=>api.delete("/expenses/"+e._id).then(load)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
