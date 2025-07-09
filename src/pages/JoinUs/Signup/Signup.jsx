import UseAuth from "@/hooks/UseAuth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const {createUser} = UseAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(result =>{
      console.log(result.user);
    })
    .catch(error =>{
      console.log(error);
    })
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to MediCamp</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} 
        noValidate="" 
        action=""
        className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                className='bg-gray-200 cursor-pointer'
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                {...register('email')}
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                {...register('password')}
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-gray-900 font-semibold mt-5"
            >
              Login now
            </button>
          </div>
        </form>
        
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div>{/* google signin */}</div>
        <p className='px-6 text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-semibold text-lime-600 hover:text-lime-500 underline-offset-4 hover:underline transition-colors'
          >
            Login
          </Link>
        
        </p>
      </div>
    </div>
  );
};

export default Signup;
