import React from "react";

type Props = {
  color?: string;
};

const Spinner = ({ color }: Props) => {
  return (
    <div role='status'>
      <svg
        aria-hidden='true'
        className='w-8 h-8 text-gray-200 animate-spin fill-blue-600'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 
    100.591C22.3858 100.591 0 78.2051 0 
    50.5908C0 22.9766 22.3858 0.59082 50 
    0.59082C77.6142 0.59082 100 22.9766 
    100 50.5908ZM9.08144 50.5908C9.08144 
    73.1865 27.4043 91.5094 50 
    91.5094C72.5957 91.5094 90.9186 
    73.1865 90.9186 50.5908C90.9186 
    27.9951 72.5957 9.67226 50 
    9.67226C27.4043 9.67226 9.08144 
    27.9951 9.08144 50.5908Z'
          fill={color || "#ffffff"}
        />
      </svg>
    </div>
  );
};

export default Spinner;
