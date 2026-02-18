import { useState } from "react";
import axios from "../api/axios";

export default function ExpenseList({ expenses, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    await axios.delete(`/expenses/${id}`);
    refresh();
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({ ...expense, amount: expense.amount / 100 });
  };

  const handleUpdate = async () => {
    await axios.put(`/expenses/${editingId}`, {
      ...editData,
      amount: Number(editData.amount) * 100
    });
    setEditingId(null);
    refresh();
  };

  return (
    <div className="expense-grid">
      {expenses.map(exp => (
        <div key={exp._id} className="glass-card expense-card">
          <h4>{exp.category}</h4>
          <p className="amount">₹ {exp.amount / 100}</p>
          <small>{new Date(exp.date).toLocaleDateString()}</small>

          {editingId === exp._id ? (
            <>
              <input
                value={editData.amount}
                onChange={e => setEditData({...editData, amount: e.target.value})}
              />
              <button className="primary-btn" onClick={handleUpdate}>Save</button>
            </>
          ) : (
            <div className="btn-group">
              <button onClick={() => handleEdit(exp)}>Edit</button>
              <button className="danger-btn" onClick={() => handleDelete(exp._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}