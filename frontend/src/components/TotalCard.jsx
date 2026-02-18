export default function TotalCard({ expenses, total }) {
  const visibleTotal = expenses.reduce((sum,e)=>sum+e.amount,0);
  return (
    <div>
      <h3>Visible Total: ₹ {visibleTotal/100}</h3>
      <p>Total Records: {total}</p>
    </div>
  );
}