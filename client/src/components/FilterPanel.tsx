const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilters,
  clearFilters,
  hasFilters,
}: any) => {
  const categoriesWithAll = [
    { slug: "", name: "All categories" },
    ...categories,
  ];
  return (
    <div className="space-y-6">
      <div className=" ">
        <h3 className="text-lg font-semibold text-app-green mb-3">
          Categories
        </h3>
        <div className="space-y-1.5">
          {categoriesWithAll.map((cat: any) => (
            <button
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${category === cat.slug ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream"}`}
              key={cat.slug}
              onClick={() => updateFilters("category", cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div className="">
        <h3 className="text-lg font-semibold text-app-green mb-3">
          Price Range
        </h3>
        <div className=" flex items-center gap-2 justify-between">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilters("minPrice", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border not-focus:border-app-border"
          />
          <span className="text-app-text-light">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilters("maxPrice", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border not-focus:border-app-border"
          />
        </div>
      </div>
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-3 py-2 text-sm  text-app-error rounded-lg hover:bg-red-50 transition-colors font-semibold border border-app-error/50"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
export default FilterPanel;
