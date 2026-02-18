export default function FilterBar({ category, setCategory }) {
  return (
    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
      <option value="">All</option>
      <option value="food">Food</option>
      <option value="travel">Travel</option>
      <option value="shopping">Shopping</option>
    </select>
  );
}