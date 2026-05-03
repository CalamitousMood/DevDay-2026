import React from 'react';

const HeadlineCards = () => {
  return (
    <div className='max-w-[1640px] max-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
      {/* Headline Cards */}
      <div className='rounded-x1 relative'> 
        {/* {Overlay} */}
        <div  className='absolute w-full h-full bg-black/50 rounded-x1 text-white'>
          <p className='font-bold text-2x1 px-2 pt-4'>Noodles for days</p>
          <p className='px-2'>Through 8/26</p>
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
        </div>
        <img
        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-x1'
        src='https://th.bing.com/th?id=OIF.PZP4C6gOcxTllJ%2fZ2ruHSA&w=290&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'
        alt='/'
        />
      </div>
      <div className='rounded-x1 relative'> 
        {/* {Overlay} */}
        <div  className='absolute w-full h-full bg-black/50 rounded-x1 text-white'>
          <p className='font-bold text-2x1 px-2 pt-4'>Eat at your own will</p>
          <p className='px-2'>Daily</p>
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
        </div>
        <img
        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-x1'
        src='https://th.bing.com/th/id/OIP.c0wPHgSjdyQUK2k88uNMVwHaEJ?w=333&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7'
        alt='/'
        />
      </div>
      <div className='rounded-x1 relative'> 
        {/* {Overlay} */}
        <div  className='absolute w-full h-full bg-black/50 rounded-x1 text-white'>
          <p className='font-bold text-2x1 px-2 pt-4'>Buy me</p>
          <p className='px-2'>Tasty Treats</p>
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Order Now</button>
        </div>
        <img
        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-x1'
        src='https://th.bing.com/th/id/OIP.OqiQZuxk9bC4CzhALYpsTAHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'
        alt='/'
        />
      </div>
    </div>
  );
};

export default HeadlineCards;
