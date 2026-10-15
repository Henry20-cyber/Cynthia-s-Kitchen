
import { Navigate, Route, Routes } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<Order />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}
