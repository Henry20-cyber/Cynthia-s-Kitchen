
import { useEffect, useState } from 'react'
import { ArrowRight, ChefHat, Clock, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getProducts } from '../services/menu'
import MealCard from '../components/MealCard'
import { useCart } from '../hooks/useCart'

export default function Home() {
  const [featuredMeals, setFeaturedMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    let cancelled = false

    async function loadFeaturedMeals() {
      try {
        const meals = await getProducts()

        if (!cancelled) {
          setFeaturedMeals(meals.slice(0, 4))
        }
      } catch (err) {
        console.error('Unable to load featured meals:', err)

        if (!cancelled) {
          setError(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFeaturedMeals()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:py-28 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-200">
              <ChefHat size={17} />
              Welcome to Cynthia's Kitchen
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Good food.
              <span className="block text-orange-400">
                Good mood.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-stone-200 sm:text-lg">
              Discover delicious meals prepared with care.
              From comforting spaghetti to smoky Asun jollof rice,
              find something you'll love.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
              >
                Explore our menu
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/order"
                className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
              >
                View cart
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-stone-300">
              <span className="flex items-center gap-2">
                <Heart size={17} className="text-orange-400" />
                Made with care
              </span>

              <span className="flex items-center gap-2">
                <Clock size={17} className="text-orange-400" />
                Freshly prepared
              </span>
            </div>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-orange-950 to-stone-900 p-8 text-center md:min-h-96">
            <div>
              <ChefHat
                size={88}
                strokeWidth={1.1}
                className="mx-auto text-orange-400"
              />
              <p className="mt-5 text-xl font-semibold">
                A taste worth coming back for
              </p>
              <p className="mt-2 text-sm text-stone-300">
                Food photography will be added here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the kitchen */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            About us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Good meals, prepared with care.
          </h2>

          <p className="mt-5 leading-7 text-stone-600">
            Cynthia's Kitchen brings together comforting meals
            and satisfying flavours. Our goal is to make it easy
            for you to discover your favourite dishes and order
            them conveniently online.
          </p>

          <p className="mt-4 leading-7 text-stone-600">
            Explore our menu, customize your meal with your
            preferred protein, and place your order in just a
            few steps.
          </p>

          <Link
            to="/menu"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-700 hover:text-orange-800"
          >
            Discover our meals
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-orange-50 p-6">
            <ChefHat size={30} className="text-orange-600" />
            <h3 className="mt-4 font-semibold">Prepared with care</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Meals made to be enjoyed.
            </p>
          </div>

          <div className="rounded-2xl bg-stone-100 p-6">
            <Heart size={30} className="text-orange-600" />
            <h3 className="mt-4 font-semibold">Your choice</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Choose chicken, beef, or no additional protein.
            </p>
          </div>
        </div>
      </section>

      {/* Featured meals */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Made for you
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Featured meals
              </h2>
              <p className="mt-2 text-stone-500">
                Find your next favourite meal.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 font-semibold text-orange-700 hover:text-orange-800"
            >
              View full menu
              <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl bg-stone-100"
                />
              ))}
            </div>
          ) : error ? (
            <p className="mt-8 rounded-xl bg-red-50 p-5 text-red-700">
              Featured meals could not be loaded. Please visit the menu.
            </p>
          ) : featuredMeals.length === 0 ? (
            <p className="mt-8 rounded-xl bg-stone-50 p-8 text-center text-stone-500">
              Our featured meals will appear here when the menu is available.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer reviews */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Customer reviews
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Your experience matters.
          </h2>

          <div className="mt-6 flex justify-center gap-1 text-orange-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={22} />
            ))}
          </div>

          <p className="mt-5 leading-7 text-stone-600">
            We'd love to hear what you think about our meals.
            Customer feedback will help us keep improving.
          </p>

          <p className="mt-3 text-sm text-stone-500">
            Customer testimonials will appear here once genuine
            reviews have been collected.
          </p>
        </div>
      </section>

      {/* Final call to action */}
      <section className="bg-orange-600 px-5 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready for something delicious?
        </h2>

        <p className="mx-auto mt-3 max-w-xl leading-7 text-orange-50">
          Browse our menu and customize your next meal.
        </p>

        <Link
          to="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          Order your meal
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  )
}
