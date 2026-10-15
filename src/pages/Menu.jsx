import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, UtensilsCrossed } from "lucide-react";

import { getCategories, getProducts } from "../services/menu";
import MealCard from "../components/MealCard";
import { useCart } from "../hooks/useCart";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const loadMenu = useCallback(async (categoryId) => {
    setLoading(true);
    setError("");

    try {
      const [categoryData, productData] = await Promise.all([
        getCategories(),
        getProducts(categoryId),
      ]);

      setCategories(categoryData);
      setProducts(productData);
    } catch (err) {
      console.error("Unable to load menu:", err);
      setError("We could not load the menu. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchMenu() {
      setLoading(true);
      setError("");

      try {
        const [categoryData, productData] = await Promise.all([
          getCategories(),
          getProducts(activeCategory),
        ]);

        if (!cancelled) {
          setCategories(categoryData);
          setProducts(productData);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Unable to load menu:", err);
          setError("We could not load the menu. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMenu();

    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) =>
      `${product.name} ${product.description ?? ""}`
        .toLowerCase()
        .includes(term),
    );
  }, [products, search]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Made for you
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore our menu
          </h1>
          <p className="mt-2 text-stone-500">Find your next favourite meal.</p>
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 sm:w-80">
          <Search size={18} className="shrink-0 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search meals..."
            aria-label="Search meals"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          aria-pressed={activeCategory === null}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium ${
            activeCategory === null
              ? "bg-orange-600 text-white"
              : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
          }`}
        >
          All meals
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium ${
              activeCategory === category.id
                ? "bg-orange-600 text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl bg-stone-100"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => loadMenu(activeCategory)}
            className="mt-4 rounded-xl bg-stone-900 px-5 py-3 text-white"
          >
            Try again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 py-16 text-center">
          <UtensilsCrossed className="mx-auto text-stone-400" size={42} />
          <h2 className="mt-4 text-lg font-semibold">
            {search ? "No matching meals" : "Our menu is coming soon"}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            {search ? "Try another search term." : "Please check back soon."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((meal) => (
            <MealCard key={meal.id} meal={meal} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </section>
  );
}
