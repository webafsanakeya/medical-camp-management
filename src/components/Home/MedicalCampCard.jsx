import { Link } from 'react-router'

const MedicalCampCard = () => {
  return (
    <Link
      to={`/camp-details/camp1`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src='https://i.ibb.co/jZj7czLC/5063406.jpg' 
            alt='Medical Camp'
          />
        </div>
        <div className='font-semibold text-lg'>Health Check-Up Camp</div>
        <div className='font-medium text-sm text-gray-600'>Location: Dhaka, Bangladesh</div>
        <div className='font-medium text-sm text-gray-600'>Date: 25 July 2025</div>
        <div className='font-medium text-sm text-gray-600'>Organized By: MediCare Foundation</div>
        <div className='font-semibold text-green-600'>Free Services Available</div>
      </div>
    </Link>
  )
}

export default MedicalCampCard
