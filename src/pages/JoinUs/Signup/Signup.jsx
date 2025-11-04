import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "@/hooks/useAuth";
import { imageUpload, saveUserInDb } from "@/api/utils";



const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form?.image?.files[0];

    const imageUrl = await imageUpload(image);

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, imageUrl);

      const userData = { name, email, image: imageUrl };
      await saveUserInDb(userData);

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      await saveUserInDb(userData);

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-50 to-lime-200 px-4">
      <div className="flex flex-col max-w-md p-6 rounded-lg sm:p-10 bg-white shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-lime-700">Sign Up</h1>
          <p className="text-gray-500 mt-1">Create your MediCamp account</p>
        </div>

   
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-50 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm mb-1">Profile Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full cursor-pointer bg-gray-50 p-1 rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-50 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="*******"
              autoComplete="new-password"
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-50 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition"
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4 space-x-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">Or continue with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border border-gray-300 p-2 rounded cursor-pointer hover:bg-gray-100 transition"
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
