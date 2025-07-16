import React from "react";
import { FaUserMd, FaUserInjured, FaUsers } from "react-icons/fa";
import { BsCalendarCheckFill, BsCurrencyDollar } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/Shared/LoadingSpinner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import RegisteredChart from "@/components/Chart/RegisteredChart";
import Calendar from 'react-calendar';

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure()
    const {data, isLoading} = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async()=>{
const {data} = await axiosSecure('/admin-stats')
return data
    }

  })
  console.log(data);
  if(isLoading) return <LoadingSpinner />
  return (
    <div>
      <div className='mt-12'>
        {/* Small Cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow'>
          {/* Total Revenue */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40'>
              <BsCurrencyDollar className='w-4 h-4 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='text-sm font-normal text-blue-gray-600'>Total Revenue</p>
              <h4 className='text-2xl font-semibold text-blue-gray-900'>${data?.totalRevenue}</h4>
            </div>
          </div>

          {/* Total Medical Camps */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40'>
              <BsCalendarCheckFill className='w-4 h-4 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='text-sm font-normal text-blue-gray-600'>Total Camps</p>
              <h4 className='text-2xl font-semibold text-blue-gray-900'>{data?.totalCamp}</h4>
            </div>
          </div>

          {/* Total Patients */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-red-600 to-red-400 text-white shadow-red-500/40'>
              <FaUserInjured className='w-4 h-4 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='text-sm font-normal text-blue-gray-600'>Total Patients</p>
              <h4 className='text-2xl font-semibold text-blue-gray-900'>{data?.totalRegistered}</h4>
            </div>
          </div>

          {/* Registered Doctors */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div className='bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-600 to-purple-400 text-white shadow-purple-500/40'>
              <FaUserMd className='w-4 h-4 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='text-sm font-normal text-blue-gray-600'>Healthcare Professionals</p>
              <h4 className='text-2xl font-semibold text-blue-gray-900'>{data?.totalUser}</h4>
            </div>
          </div>
        </div>

        {/* Charts & Calendar */}
        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/* Camp Participation Chart */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
           <RegisteredChart barChartData={data?.barChartData}/>
          </div>

          {/* Calendar or Schedule Widget */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
           <Calendar />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
