import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'
import ProtectRoute from './pages/routes/ProtectRoute.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import App from './App.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path:'/admin',
    element:<AdminDashboard/>
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
