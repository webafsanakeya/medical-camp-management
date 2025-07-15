import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// create client
const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-inter max-w-7xl mx-auto">
       <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
   </QueryClientProvider>
      
    </div>
  </StrictMode>
);
