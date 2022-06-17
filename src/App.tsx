import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header, Notification } from './components'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { useAppSelector } from './redux/hooks'

import './scss/app.scss'

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart')
)

const App: React.FC = () => {
  const { shown, type, message } = useAppSelector(
    (state) => state.notifications
  )

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {shown && <Notification type={type} message={message} />}
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
