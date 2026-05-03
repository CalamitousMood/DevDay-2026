import React from 'react';

const Hero = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
      <div className='max-h-[500px] relative'>
        <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
        <h1 className='px-4 text-4xl font-bold'>
          The <span className='text-orange-500'>Best</span>
        </h1>
        <h1 className='px-4 text-4xl font-bold'>
          <span className='text-orange-500'>Foods</span> Delivered
        </h1>
        </div>
        <img
        className='w-full max-h-[500px] object-cover'
        src="https://th.bing.com/th/id/OIP.zJYkWb2ZjjOBjelj4i5PGQHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        alt="/"
        />
    </div>
    </div>
  );
};

export default Hero;