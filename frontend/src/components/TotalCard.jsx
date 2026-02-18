export default function TotalCard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  return (
    <div className="glass-card total-card">
      <h2>Total Spending</h2>
      <p>₹ {total / 100}</p>
    </div>
  );
}