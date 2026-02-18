import axios from "../api/axios";

export default function ExpenseList({ expenses, refresh }) {

  const handleDelete = async(id)=>{
    await axios.delete(`/expenses/${id}`);
    refresh();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(e=>(
          <tr key={e._id}>
            <td>{e.category}</td>
            <td>₹ {e.amount/100}</td>
            <td>{new Date(e.date).toLocaleDateString()}</td>
            <td><button onClick={()=>handleDelete(e._id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}