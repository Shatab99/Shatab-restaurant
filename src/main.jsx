import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Root';
import Home from './Components/Home/Home';
import Error from './Components/Error/Error';
import Menu from './Components/Pages/Menu';
import { HelmetProvider } from 'react-helmet-async';
import Shop from './Components/Pages/Shop';
import Contact from './Components/Pages/Contact';
import LogIn from './Components/Pages/LogIn';
import SignUp from './Components/Pages/SignUp';
import AuthProvider from './Components/Secret/AuthProvider';
import PrivateRoute from './Components/Secret/PrivateRoute';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './Components/DashBoard/Dashboard';
import Carts from './Components/DashBoard/Carts';
import UserHome from './Components/DashBoard/UserHome';
import AddReviews from './Components/DashBoard/AddReviews';
import Bookings from './Components/DashBoard/Bookings';
import AllUsers from './Components/DashBoard/Admin/AllUsers';

import AdminRoutes from './Components/Secret/AdminRoutes';
import AddItems from './Components/DashBoard/Admin/AddItems';
import ManageItems from './Components/DashBoard/Admin/ManageItems';
import UpdateItems from './Components/DashBoard/Admin/UpdateItems';
import Profile from './Components/Profile/Profile';
import Payment from './Components/DashBoard/Payment';
import PaymentHistory from './Components/DashBoard/PaymentHistory';
import AdminHome from './Components/DashBoard/Admin/AdminHome';
import ManageBookings from './Components/DashBoard/Admin/ManageBookings';
import UserFeedbacks from './Components/DashBoard/Admin/UserFeedbacks';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/shop/:cat',
        element: <PrivateRoute><Shop /></PrivateRoute>
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      }

    ]
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: 'carts',
        element: <PrivateRoute><Carts /></PrivateRoute>
      },
      {
        path: 'userhome',
        element: <PrivateRoute><UserHome /></PrivateRoute>
      },
      {
        path: 'reviews',
        element: <PrivateRoute><AddReviews /></PrivateRoute>
      },
      {
        path: 'bookings',
        element: <PrivateRoute><Bookings /></PrivateRoute>
      },
      //Admin routes
      {
        path: 'allusers',
        element: <AdminRoutes><AllUsers /></AdminRoutes>
      },
      {
        path: 'additems',
        element: <AdminRoutes><AddItems /></AdminRoutes>
      },
      {
        path: 'manageitems',
        element: <AdminRoutes><ManageItems /></AdminRoutes>
      },
      {
        path: 'adminhome',
        element: <AdminRoutes><AdminHome /></AdminRoutes>
      },
      {
        path: 'menu/:id',
        element: <AdminRoutes><UpdateItems /></AdminRoutes>,
        loader: ({ params }) => fetch(`https://online-restaurant-server.vercel.app/menu/${params.id}`)
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
      {
        path: 'paymenthistory',
        element: <PrivateRoute><PaymentHistory /></PrivateRoute>
      },
      {
        path: 'managebooking',
        element: <AdminRoutes><ManageBookings /></AdminRoutes>
      },
      {
        path : 'feedback',
        element: <AdminRoutes><UserFeedbacks/></AdminRoutes>
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className=''>
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
