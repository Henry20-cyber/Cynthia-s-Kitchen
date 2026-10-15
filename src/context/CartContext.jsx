import { useMemo, useState } from 'react'
import { CartContext } from './cartContext'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.unitPriceKobo * item.quantity,
        0,
      ),
    [cartItems],
  )

  function addToCart(item) {
    const key = `${item.productId}:${item.proteinId}`

    setCartItems((current) => {
      const existing = current.find((entry) => entry.key === key)

      if (existing) {
        return current.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        )
      }

      return [...current, { ...item, key, quantity: 1 }]
    })
  }

  function changeQuantity(key, amount) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(key) {
    setCartItems((current) =>
      current.filter((item) => item.key !== key),
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
