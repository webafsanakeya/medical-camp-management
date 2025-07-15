import React from 'react';
import { PulseLoader} from 'react-spinners';

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <PulseLoader size={15} color='#15a249' />
    </div>
  )
}

export default LoadingSpinner
