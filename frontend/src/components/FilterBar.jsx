export default function FilterBar({ category, setCategory, sort, setSort }) {
  return (
    <div className="glass-card filter-bar">
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="shopping">Shopping</option>
      </select>

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="date_desc">Newest</option>
        <option value="date_asc">Oldest</option>
      </select>
    </div>
  );
}