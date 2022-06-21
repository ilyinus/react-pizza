import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header, Notification } from './components'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { useAppSelector } from './redux/hooks'
import { setItem } from './utils/localStorage'

import './scss/app.scss'

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
)

const App: React.FC = () => {
  const { notifications, cart } = useAppSelector((state) => ({
    notifications: state.notifications,
    cart: state.cart
  }))
  const isRendered = React.useRef(false)

  React.useEffect(() => {
    if (isRendered.current) {
      setItem('cart', cart)
    } else {
      isRendered.current = true
    }
  }, [cart])

  return (
    <div className="wrapper">
      <Header count={cart.count} amount={cart.amount} />
      <div className="content">
        {notifications.shown && (
          <Notification
            type={notifications.type}
            message={notifications.message}
          />
        )}
        <React.Suspense fallback={<div>Идет загрузка</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
