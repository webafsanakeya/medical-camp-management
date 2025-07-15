import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

import Signup from "@/pages/JoinUs/Signup/SignUp";
import DashboardLayout from "@/layouts/DashboardLayout";
import CampDetails from "@/pages/CampDetails/CampDetails";
import ErrorPage from "@/pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Statistics from "@/pages/Dashboard/Common/Statistics";
import AddCamp from "@/pages/Dashboard/Organizer/AddCamp";
import MyInventory from "@/pages/Dashboard/Organizer/MyInventory";
import ManageUsers from "@/pages/Dashboard/Admin/ManageUsers";
import RegisteredCamp from "@/pages/Dashboard/Participant/RegisteredCamp";
import ManageRegisteredCamps from "@/pages/Dashboard/Organizer/ManageRegisteredCamps";
import Login from "@/pages/JoinUs/Login/Login";
import Profile from "@/pages/Dashboard/Common/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/camps`)
      },
      {
        path: '/camp/:id',
        element: <CampDetails />,
        

      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
           <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-camp',
        element: (
          <PrivateRoute>
           <AddCamp />
          </PrivateRoute>
        ),

      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
          <MyInventory />
          </PrivateRoute>
        ),
      },
        {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
         {
        path: 'registered-camp',
        element: (
          <PrivateRoute>
            <RegisteredCamp />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-registered-camp',
        element: <ManageRegisteredCamps />
      },
    ],
  },
  
]);
