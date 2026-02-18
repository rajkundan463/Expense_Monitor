import { useState } from "react";
import axios from "../api/axios";

export default function ExpenseForm({ refresh }) {
  const [amount,setAmount]=useState("");
  const [category,setCategory]=useState("");
  const [date,setDate]=useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await axios.post("/expenses",{
      amount:Number(amount)*100,
      category,
      date
    });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
      <input placeholder="Category" onChange={(e)=>setCategory(e.target.value)} />
      <input type="date" onChange={(e)=>setDate(e.target.value)} />
      <button>Add</button>
    </form>
  );
}