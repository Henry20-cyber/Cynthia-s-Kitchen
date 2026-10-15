
import { ChefHat, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-white">
              <ChefHat size={21} />
            </span>

            <span className="font-bold text-stone-900">
              Cynthia's Kitchen
            </span>
          </Link>

          <p className="mt-3 max-w-xs text-sm leading-6 text-stone-500">
            Delicious meals prepared with care. Good food, good mood.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-stone-900">Explore</h2>

          <div className="mt-3 flex flex-col items-start gap-2 text-sm text-stone-500">
            <Link to="/" className="hover:text-orange-600">
              Home
            </Link>

            <Link to="/menu" className="hover:text-orange-600">
              Our menu
            </Link>

            <Link to="/order" className="hover:text-orange-600">
              Your order
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-stone-900">Stay connected</h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Visit our menu to discover our meals and place your order.
          </p>

          <Link
            to="/menu"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-orange-300 hover:text-orange-700"
          >
            Explore menu
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      <div className="border-t border-stone-100 px-5 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Cynthia's Kitchen. All rights reserved.
      </div>
    </footer>
  )
}
