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


import RegisteredCamp from "@/pages/Dashboard/Participant/RegisteredCamp";

import Login from "@/pages/JoinUs/Login/Login";
import Profile from "@/pages/Dashboard/Common/Profile";
import ManageRegistered from "@/pages/Dashboard/Organizer/ManageRegisteredCamps";
import AdminRoute from "./AdminRoute";
import ManageUsers from "@/pages/Dashboard/Admin/ManageUsers";
import OrganizerRoute from "./OrganizerRoute";
import ManageCamps from "@/pages/Dashboard/Organizer/ManageCamps";


import AvailableCamps from "@/components/Home/AvailableCamps";
import MyBookings from "@/pages/Dashboard/Common/MyBookings";
import About from "@/pages/About/About";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/camps`),
      },
      {
        path: '/available-camps',
        element: <AvailableCamps />,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/camps`),

      },
      {
        path: "/camp/:id",
        element: <CampDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
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
        path: "add-camp",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <AddCamp />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageCamps></ManageCamps>
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
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
        path: "registered-camp",
        element: (
          <PrivateRoute>
            <RegisteredCamp />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-registered",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageRegistered />
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
 
    ],
  },
]);
