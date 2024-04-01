const NavigationTopBar = () => {
    return (
      <header className="self-stretch flex flex-row items-center justify-center max-w-full z-[2] text-center text-sm text-gray-200 font-nunito-sans">
        <div className="flex-1 flex flex-row items-center justify-between py-[13px] pr-[99px] pl-[30px] box-border relative gap-[20px] max-w-full lg:pr-[49px] lg:box-border mq750:pr-6 mq750:box-border">
          <div className="h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white" />
          <div className="flex flex-col items-start justify-start pt-0 px-0 pb-0 opacity-[0.9] mix-blend-normal z-[1] text-3xl font-lineawesome">
            <img className="w-6 h-6 relative" loading="eager" alt="" />
            <h3 className="m-0 h-[25px] relative text-inherit font-medium font-inherit inline-block z-[1] mt-[-23px] mq450:text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </h3>
          </div>
  
          <div className="w-[251px] flex flex-row items-center justify-start gap-[27px] text-left text-dimgray-100">
            <div className="flex-1 flex flex-row items-center justify-start gap-[10px] z-[1]">
              <div className="w-[46px] flex flex-col items-start justify-start py-0 pr-1.5 pl-0 box-border">
                <img
                  className="w-10 h-[27px] relative object-cover"
                  loading="eager"
                  alt=""
                  src="/flag@2x.png"
                />
              </div>
              <div className="flex-1 relative font-semibold">English</div>
              <div className="h-[9px] flex flex-col items-start justify-start pt-0 pb-[3px] pr-px pl-0 box-border">
                <img
                  className="w-[8.2px] h-[4.7px] relative"
                  loading="eager"
                  alt=""
                  src="/drop-down.svg"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-start py-0 pr-3 pl-0 relative gap-[20px] z-[1] text-xs text-dimgray-300">
              <img
                className="h-[18px] w-[18px] relative hidden z-[0]"
                alt=""
                src="/more.svg"
              />
              <img
                className="h-11 w-11 relative object-cover"
                loading="eager"
                alt=""
                src="/man438081-960-720@2x.png"
              />
              <div className="absolute my-0 mx-[!important] right-[0px] bottom-[3px] font-semibold">
                Admin
              </div>
              <b className="h-[38px] relative text-sm inline-block text-darkslategray-100">
                <p className="m-0">FCU</p>
              </b>
            </div>
          </div>
          <div className="h-[38px] w-[388px] relative hidden max-w-full z-[6]">
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-lgi bg-ghostwhite box-border border-[0.6px] border-solid border-lightgray" />
            <div className="absolute top-[calc(50%_-_9px)] left-[11.6%] opacity-[0.5] mix-blend-normal">
              Search
            </div>
            <img
              className="absolute h-[39.47%] w-[3.87%] top-[27.63%] right-[91.88%] bottom-[32.89%] left-[4.25%] max-w-full overflow-hidden max-h-full mix-blend-normal"
              alt=""
              src="/search.svg"
            />
          </div>
        </div>
      </header>
    );
  };
  
  export default NavigationTopBar;
  