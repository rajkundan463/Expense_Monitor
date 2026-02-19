
import { useEffect,useState } from "react";
import api from "../api/axios";

export default function Admin(){
  const [users,setUsers]=useState([]);
  const [expenses,setExpenses]=useState([]);

  useEffect(()=>{
    api.get("/admin/users").then(r=>setUsers(r.data));
    api.get("/admin/expenses").then(r=>setExpenses(r.data));
  },[]);

  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="glass card">
        <h3>Users</h3>
        {users.map(u=><div key={u._id}>{u.email}</div>)}
      </div>
      <div className="glass card">
        <h3>All Expenses</h3>
        {expenses.map(e=>(
          <div key={e._id} className="row">
            {e.category} ₹{e.amount/100}
            <button onClick={()=>api.delete("/admin/expenses/"+e._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
