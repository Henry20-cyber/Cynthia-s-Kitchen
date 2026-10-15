
const NAIRA = 100

export const menuPricing = {
  spaghetti: {
    basePrice: 2500 * NAIRA,
    proteins: [
      { id: 'none', name: 'No protein', price: 0 },
      { id: 'chicken', name: 'Chicken', price: 1000 * NAIRA },
      { id: 'beef', name: 'Beef', price: 1500 * NAIRA },
    ],
  },

  smokeyAsunJollofRice: {
    basePrice: 3500 * NAIRA,
    proteins: [
      { id: 'none', name: 'No additional protein', price: 0 },
      { id: 'chicken', name: 'Chicken', price: 1000 * NAIRA },
      { id: 'beef', name: 'Beef', price: 1500 * NAIRA },
    ],
  },
}

export function getMealPricing(meal) {
  const identifier = `${meal.slug} ${meal.name}`.toLowerCase()

  if (identifier.includes('spaghetti')) {
    return menuPricing.spaghetti
  }

  if (
    identifier.includes('asun') ||
    identifier.includes('jollof')
  ) {
    return menuPricing.smokeyAsunJollofRice
  }

  return {
    basePrice: Number(meal.price_kobo),
    proteins: [
      { id: 'none', name: 'No additional protein', price: 0 },
    ],
  }
}
