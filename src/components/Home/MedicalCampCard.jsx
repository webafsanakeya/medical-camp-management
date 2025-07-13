import { Link } from 'react-router'

const MedicalCampCard = ({camp}) => {
  const {_id, campName,
      dateTime,
      location,
      doctor,
      participantCount,
      image, fees, description} = camp || {}
  return (
    <Link
      to={`/camp/${_id}`}
      className='group shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden bg-white'
    >
      <div className='flex flex-col'>
        <div
          className='
              aspect-video w-full relative overflow-hidden
            '
        >
          <img
            className='
               object-cover w-full h-full group-hover:scale-105 transition-transform duration-300
              '
            src={image}
            alt='Medical Camp'
          />
        </div>
           <div className='p-4 space-y-1'>
      <h3 className='text-lg font-semibold'>{campName}</h3>
      <p className='text-sm text-gray-600'>{location}</p>
      <p className='text-sm text-gray-500'>{new Date(dateTime).toLocaleString()}</p>
      <p className='text-sm text-gray-600'>{doctor}</p>
      <p className='text-sm text-gray-600'>{fees}</p>
      <p className='font-bold text-green-600'>{participantCount}</p>
      <p className='font-bold text-green-600'>{description}</p>
      

    </div>
      </div>
    </Link>
  )
}

export default MedicalCampCard
