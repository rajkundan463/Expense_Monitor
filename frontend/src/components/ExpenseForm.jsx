import { useState } from "react";
import axios from "../api/axios";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm({ refresh }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const idempotencyKey = uuidv4();

    await axios.post("/expenses", {
      amount: Number(amount) * 100,
      category,
      description,
      date
    }, { headers: { "Idempotency-Key": idempotencyKey }});

    setLoading(false);
    refresh();
  };

  return (
    <form className="glass-card" onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      <div className="grid">
        <input type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
        <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
        <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <input type="date" onChange={e => setDate(e.target.value)} />
      </div>
      <button className="primary-btn" disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}