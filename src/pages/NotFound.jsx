
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-16 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-stone-500">
          Sorry, we couldn't find the page you were looking for.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>
      </div>
    </section>
  )
}
