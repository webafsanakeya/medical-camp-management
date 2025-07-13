import React from 'react';

const LoadingSpinner = ({ loader: Loader, smallHeight = false, color = '#36d7b7', size = 15 }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'} 
      flex 
      flex-col 
      justify-center 
      items-center`}
    >
      {Loader && <Loader color={color} size={size} />}
    </div>
  );
};

export default LoadingSpinner;
