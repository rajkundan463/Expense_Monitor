
import { useEffect,useState } from "react";
import api from "../api/axios";

export default function Budget(){
  const [status,setStatus]=useState({});
  const [budget,setBudget]=useState("");

  const load=()=>api.get("/budget/status").then(r=>setStatus(r.data));
  useEffect(()=>{load();},[]);

  const save=async()=>{
    await api.post("/budget",{monthlyBudget:parseInt(budget)});
    load();
  };

  return (
    <div>
      <h1>Budget</h1>
      <div className="glass card">
        <input placeholder="Monthly Budget (paise)" onChange={e=>setBudget(e.target.value)}/>
        <button onClick={save}>Set Budget</button>
        <p>Spent: ₹{status.spent/100}</p>
        <p>Limit: ₹{status.limit/100}</p>
        {status.warning && <p className="warn">⚠ 80% reached</p>}
        {status.alert && <p className="alert">🚨 Budget exceeded</p>}
      </div>
    </div>
  );
}
