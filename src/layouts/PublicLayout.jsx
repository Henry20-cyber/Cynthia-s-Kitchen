
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'

export default function PublicLayout() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#fffdf9] text-stone-900">
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}
