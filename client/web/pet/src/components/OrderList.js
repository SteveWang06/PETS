import React from "react";

const OrderList = () => {
  return (
    <section className='absolute top-[219px]  rounded-sm bg-white box-border w-[1141px] flex flex-col items-center justify-start pt-0 px-0 pb-[55px] gap-[21px] max-w-full z-[1] text-left text-sm text-gray-1000 font-nunito-sans border-[0.3px] border-solid border-silver'>
      <div className='self-stretch rounded-t-sm rounded-b-none bg-gray-100 overflow-x-auto flex flex-row items-center justify-between pt-[15px] pb-[13px] pr-[78px] pl-[31px] gap-[20px] shrink-0 z-[1] border-[0.6px] border-solid border-lightgray'>
        <div className='flex flex-col items-start justify-start py-0 pr-[9px] pl-6'>
          <div className='relative font-extrabold mix-blend-normal'>ID</div>
        </div>
        <div className='flex flex-col items-start justify-start py-0 pr-[20px] pl-0'>
          <div className='relative font-extrabold mix-blend-normal'>NAME</div>
        </div>
        <div className='w-32 shrink-0 flex flex-col items-start justify-start'>
          <div className='relative font-extrabold mix-blend-normal'>
            ADDRESS
          </div>
        </div>
        <div className='relative font-extrabold mix-blend-normal'>BIRTHDAY</div>
        <div className='flex flex-col items-start justify-start py-0 pr-[11px] pl-0'>
          <div className='relative font-extrabold mix-blend-normal'>STATUS</div>
        </div>
        <div className='relative font-extrabold mix-blend-normal'>ACTION</div>
      </div>

      <div className='w-[1017px] flex flex-row items-start justify-start'>
        <div className='flex-1 flex flex-row items-center justify-between gap-[20px]  mq950:flex-wrap'>
          <div className='flex flex-col items-start justify-start py-0 pl-0'>
            <div className='relative font-semibold mix-blend-normal'>00001</div>
          </div>
          <div className='w-[80px] flex flex-col items-start justify-start'>
            <div className='relative font-semibold mix-blend-normal'>
              Christine
            </div>
          </div>

          <div className='w-[150px] flex flex-col items-start justify-start'>
            <div className='relative font-semibold mix-blend-normal'>
            089 Kutch Green Apt
            </div>
          </div>

          <div className='w-[84px] flex flex-col items-start justify-start '>
            <div className='relative font-semibold mix-blend-normal'>
              14 Feb 2019
            </div>
          </div>
          <div className='w-[90px] flex flex-col items-start justify-start'>
            <div className='relative font-semibold mix-blend-normal'>
              Online
            </div>
          </div>

          <div className='bg-gray-100 rounded-sm border-[0.3px] border-solid border-silver'>
            <button className='cursor-pointer rounded-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </button>

            <div className="absolute ml-9 top-[70px]  bg-gray-800 w-[0.5px] h-8 mix-blend-normal" />

            <button className="cursor-pointer text-red-600 rounded-sm">
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
