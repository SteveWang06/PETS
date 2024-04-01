import React from "react";

const ContainerUser = () => {
  return (
    <div className='self-stretch flex-1 flex flex-col items-center justify-start gap-[30px] text-center text-3xl text-gray-200 font-lineawesome'>
      <div className='flex flex-row items-start justify-start py-0 pr-[41px] pl-5 text-left text-xl text-royalblue-100 font-nunito-sans'>
        <div className='flex flex-row items-center justify-start py-0 pr-2 pl-0'>
          <h3 className='m-0 h-[27px] relative text-inherit font-extrabold font-inherit inline-block mq450:text-base'>
            PET ADMIN
          </h3>
        </div>
      </div>
      <div className='cursor-pointer self-stretch flex-1 flex flex-col items-start justify-start gap-[1px]'>

        
        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center '>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            
            <div className='m-0 relative text-inherit text-gray-200 font-medium font-inherit z-[3] mq450:text-lg'>
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
                  d='m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
                />
              </svg>
            </div>
            <div className='relative text-sm text-left tracking-[0.3px] font-semibold font-nunito-sans text-gray-200  z-[3]'>
              Dashboard
            </div>
          </div>
        </button>



        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center '>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            <div className='h-full w-full my-0 mx-[!important] absolute top-[0px] right-[0px] bottom-[0px] left-[0px] flex flex-row items-start justify-start py-0 pr-[19px] pl-0 box-border gap-[20px]'>
              <div className='self-stretch w-[238px] relative bg-white hidden opacity-[0] mix-blend-normal' />
              <div className='self-stretch w-[8.9px] relative rounded bg-royalblue-100 z-[2]' />
              <div className='self-stretch flex-1 relative rounded-md bg-royalblue-100 z-[2]' />
            </div>
            <div className='m-0 relative text-inherit text-white font-medium font-inherit z-[3] mq450:text-lg'>
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
                  d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
                />
              </svg>
            </div>
            <div className='relative text-sm text-left tracking-[0.3px] font-semibold font-nunito-sans text-white  z-[3]'>
              User
            </div>
          </div>
        </button>


        

        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center'>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
            <div className='relative text-3xl font-medium font-lineawesome text-gray-200 text-center z-[1] mq450:text-lg'>
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
                  d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                />
              </svg>
            </div>
            <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-gray-200 text-left z-[1]'>
              Shop
            </div>
          </div>
        </button>

        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center'>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
            <div className='relative text-3xl font-medium font-lineawesome text-gray-200 text-center z-[1] mq450:text-lg'>
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
                  d='M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3'
                />
              </svg>
            </div>
            <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-gray-200 text-left z-[1]'>
              Products
            </div>
          </div>
        </button>

        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center'>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
            <div className='relative text-3xl font-medium font-lineawesome text-gray-200 text-center z-[1] mq450:text-lg'>
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
                  d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
                />
              </svg>
            </div>
            <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-gray-200 text-left z-[1]'>
              Hospital
            </div>
          </div>
        </button>

        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center'>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
            <div className='relative text-3xl font-medium font-lineawesome text-gray-200 text-center z-[1] mq450:text-lg'>
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
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </div>
            <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-gray-200 text-left z-[1]'>
              Doctor
            </div>
          </div>
        </button>

        <button className='cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center'>
          <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[23px]'>
            <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
            <div className='relative text-3xl font-medium font-lineawesome text-gray-200 text-center z-[1] mq450:text-lg'>
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
                  d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                />
              </svg>
            </div>
            <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-gray-200 text-left z-[1]'>
              Post
            </div>
          </div>
        </button>
      </div>
      <div className='self-stretch flex flex-col items-start justify-start gap-[16px]'>
        <img
          className='self-stretch h-px relative max-w-full overflow-hidden shrink-0'
          loading='eager'
          alt=''
          src='/divider3.svg'
        />
        <div className='self-stretch flex flex-col items-start justify-start'>
          <div className='self-stretch flex flex-row items-center justify-center z-[1]'>
            <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[21px]'>
              <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
              <h3 className='m-0 relative text-inherit font-medium font-inherit z-[1] mq450:text-lg'>
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
                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
                  />
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </h3>
              <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-left z-[1]'>
                Settings
              </div>
            </div>
          </div>
          <div className='self-stretch flex flex-row items-center justify-center'>
            <div className='flex-1 flex flex-row items-start justify-start pt-3.5 px-10 pb-[11px] relative gap-[22px]'>
              <div className='h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white opacity-[0] mix-blend-normal' />
              <h3 className='m-0 relative text-inherit font-medium font-inherit z-[1] mq450:text-lg'>
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
                    d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
                  />
                </svg>
              </h3>
              <div className='relative text-sm tracking-[0.3px] font-semibold font-nunito-sans text-left z-[1]'>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerUser;
