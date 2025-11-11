import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { HiOutlineKey } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { CgSpinner } from "react-icons/cg";

const SignIn = () => {
  const { signIn, signInWithGoogle, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const addUserToDB = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosSecure.post("/users", userInfo);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const redirectByRole = (role) => {
    if (role === "organizer") {
      navigate("/dashboard/organizer/overview", { replace: true });
    } else {
      navigate("/dashboard/participant/profile", { replace: true });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    setLoading(true);

    try {
      const result = await signIn(email, password);
      const role = result?.user?.role || "user"; // default role
      toast.success("Login Successful! Welcome to MediCamp.");
      redirectByRole(role);
    } catch (err) {
      toast.error(err?.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await addUserToDB.mutateAsync(userData);
      toast.success("Google Sign-In successful! Welcome to MediCamp.");
      redirectByRole(userData.role);
    } catch (err) {
      toast.error(err?.message || "Google Sign-In failed. Please try again.");
    }
  };

  if (user) {
    return <Navigate to={from} replace={true} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-teal-50 via-teal-100 to-cyan-50">
            <HiOutlineKey className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Welcome back to MediCamp.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border-none bg-gray-100 p-3 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-lg bg-gradient-to-r from-teal-400 via-cyan-400 to-cyan-500 hover:scale-105"
          >
            {loading ? <CgSpinner className="h-5 w-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="my-6 border-t border-gray-300 text-center text-sm text-gray-500">Or continue with</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 text-teal-600 hover:text-teal-400"
        >
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="font-medium text-teal-600 hover:text-teal-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
