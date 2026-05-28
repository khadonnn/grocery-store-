import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Product } from "../types";
import { categoriesData, dummyProducts } from "../assets/assets";
import { ChevronDown, Home, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page") || "1");
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const fetchproducts = async () => {
    setLoading(true);
    setProducts(
      dummyProducts.filter((p) => p.category === category || category === ""),
    );
    setLoading(false);
  };
  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  };

  const activeCategory =
    categoriesData.find((c) => c.slug === category) || null;
  const hasFilters = category || organic || minPrice || maxPrice;
  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };
  useEffect(() => {
    fetchproducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-app-creamy">
      <div className="max-w-7xl mx-auto px-4 xm:px-6 lg:px-8 py-6">
        {/* breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6 ">
          <Link to="/" className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">
            {activeCategory ? activeCategory.name : "All products"}
          </span>
        </nav>
        <div className="flex gap-8 xl:gap-10">
          {/* sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <p>Filters</p>
            </div>
          </aside>
          {/* main content */}
          <main className="flex-1">
            {/* header */}

            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-semibold text-app-green ">
                <h1>{activeCategory ? activeCategory.name : "All products"}</h1>
                <p>{products.length} products found</p>
              </div>
              <div className="flex flex-col lg:items-center gap-3">
                {/* mobile filters */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors"
                >
                  <SlidersHorizontal />
                  Filters
                </button>
                {/* sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilters("sort", e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-app-green focus:border-transparent transition"
                  >
                    <option value="newest">Newest </option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="rating">Top rated</option>
                    <option value="name">A → Z</option>
                  </select>
                  <ChevronDown className="size-3 absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>
            {/* product grid */}
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <div className="text-center py-16 gap-4 flex flex-col items-center">
                <p className="text-2xl font-semibold text-app-green mb-2">
                  {" "}
                  No products found.
                </p>
                <p className="text-app-text-light text-sm">
                  Try adjusting your filters or check back later.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 text-sm font-medium bg-app-green text-white rounded-lg hover:bg-app-green-light transition-colors"
                >
                  Clear Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-8 gap-4">
                {products.map(
                  (product) =>
                    product.stock > 0 && (
                      <ProductCard key={product._id} product={product} />
                    ),
                )}
              </div>
            )}
            {/* pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      updateFilters("page", String(i + 1));
                      scrollTo(0, 0);
                    }}
                    className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "bg-app-green text-white" : "bg-white text-app-green border border-app-border hover:bg-app-cream"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
