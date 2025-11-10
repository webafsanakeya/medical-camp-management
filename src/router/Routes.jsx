import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import OrganizerProfile from "@/Dashboard/OrganizerProfile";
import AddCamp from "@/Dashboard/AddCamp";
import ManageCamps from "@/Dashboard/ManageCamps";
import OrganizerOverview from "@/Dashboard/OrganizerOverview";
import UpdateCamp from "@/Dashboard/UpdateCamp";
import ManageRegisteredCamps from "@/Dashboard/ManageRegisteredCamps";

import ParticipantProfile from "@/Dashboard/Participant-Dashboard/ParticipantProfile";
import ParticipantAnalytics from "@/Dashboard/Participant-Dashboard/ParticipantAnalytics";
import RegisteredCamps from "@/Dashboard/Participant-Dashboard/RegisteredCamps";
import PaymentHistory from "@/Dashboard/Participant-Dashboard/PaymentHistory";
import FeedbackRatings from "@/Dashboard/Participant-Dashboard/FeedbackRatings";
import PaymentPage from "@/Dashboard/Participant-Dashboard/PaymentPage";



// Layouts
import RootLayout from "@/RootLayout/RootLayout";


// Public Pages
import AvailableCamps from "@/pages/Available-Camp/AvailableCamps";
import CampDetails from "@/pages/CampDetails/CampDetails";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import Home from "@/pages/Home/Home";
import SignIn from "@/pages/JoinUs/SignIn/SignIn";
import SignUp from "@/pages/JoinUs/SignUp/SignUp";
import DashboardLayout from "@/Dashboard/DashboardLayout";



// Initialize Stripe



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "available-camps", element: <AvailableCamps /> },
      {
        path: "camp-details/:id",
        element: (
          <PrivateRoute>
            <CampDetails />
          </PrivateRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Organizer routes
      { path: "profile", element: <OrganizerProfile /> },
      { path: "add-camp", element: <AddCamp /> },
      { path: "manage-camps", element: <ManageCamps /> },
      { path: "overview", element: <OrganizerOverview /> },
      { path: "update-camp/:campId", element: <UpdateCamp /> },
      { path: "manage-registered-camps", element: <ManageRegisteredCamps /> },

      // Participant/User routes
      { path: "profile", element: <ParticipantProfile /> },
      { path: "analytics", element: <ParticipantAnalytics /> },
      { path: "registered-camps", element: <RegisteredCamps /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "feedback-ratings", element: <FeedbackRatings /> },
      { path: "payment/:registrationId", element: <PaymentPage /> },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
