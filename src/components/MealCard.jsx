
import { useState } from 'react'
import { ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { getMealPricing } from '../config/menuPricing'

const formatNaira = (kobo) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(kobo / 100)

export default function MealCard({ meal, onAddToCart }) {
  const pricing = getMealPricing(meal)
  const [proteinId, setProteinId] = useState('none')

  const selectedProtein =
    pricing.proteins.find((item) => item.id === proteinId) ??
    pricing.proteins[0]

  const price = pricing.basePrice + selectedProtein.price

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        {meal.image_url ? (
          <img
            src={meal.image_url}
            alt={meal.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400">
            <UtensilsCrossed size={42} strokeWidth={1.3} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-900">
          {meal.name}
        </h3>

        <p className="mt-2 min-h-10 text-sm leading-5 text-stone-500">
          {meal.description || 'Freshly prepared with care.'}
        </p>

        <label className="mt-4 block text-sm font-medium text-stone-700">
          Choose protein
          <select
            value={proteinId}
            onChange={(event) => setProteinId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 outline-none focus:border-orange-500"
          >
            {pricing.proteins.map((protein) => (
              <option key={protein.id} value={protein.id}>
                {protein.name}
                {protein.price > 0
                  ? ` (+${formatNaira(protein.price)})`
                  : ''}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-orange-700">
            {formatNaira(price)}
          </span>

          <button
            type="button"
            onClick={() =>
              onAddToCart?.({
                productId: meal.id,
                name: meal.name,
                imageUrl: meal.image_url,
                proteinId: selectedProtein.id,
                proteinName: selectedProtein.name,
                unitPriceKobo: price,
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
          >
            <ShoppingBag size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
