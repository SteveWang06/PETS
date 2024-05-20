import NavigationTopBar from "../components/NavigationTopBar";
import Footer from "../components/Footer";
import OrderList from "../components/OrderList";
import ContainerUser from "../components/ContainerUser";

const User = () => {
  return (
    <div className="">
      <div className="w-full relative bg-white overflow-hidden flex flex-row items-start justify-start gap-[1px] tracking-[normal] text-center text-3xl text-white font-lineawesome mq1050:pl-px mq1050:pr-px mq1050:box-border">
        <div className="h-[979px] w-[238px] flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border mq1050:hidden">
          <ContainerUser/>
        </div>

        <main className="flex-1 flex flex-col items-center  bg-ghostwhite pt-0 pb-[950px] pr-0 pl-px box-border relative gap-[28px] max-w-[calc(100%_-_239px)] text-left text-[32px] text-gray-200 font-nunito-sans lg:pb-[357px] lg:box-border mq1050:max-w-full mq750:pb-[232px] mq750:box-border">
          <NavigationTopBar />

          <div className="absolute top-[106px] left-[840px] rounded-lgi bg-white box-border w-[388px] flex flex-row items-center justify-start pt-2.5 px-[17px] pb-[9px] gap-[14px] z-[1] border-[0.6px] border-solid border-lightgray">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              className="w-full [border:none] [outline:none] font-nunito-sans text-sm bg-[transparent] h-[19px] relative text-gray-900  inline-block "
              placeholder="Search"
              type="text"
            />
          </div>

          <button className="cursor-pointer bg-royalblue-100 [border:none] pt-[11px] pb-2.5 pr-5 pl-6 bg-royalblue-200 absolute top-[100px] left-[1263px] rounded-md flex flex-row items-center justify-center whitespace-nowrap z-[1] hover:bg-dodgerblue">
            <b className="relative text-sm leading-[27px] font-nunito-sans text-white text-center">
              Add New Shop
            </b>
          </button>

          <div className="self-stretch flex flex-row items-start justify-start py-0 px-5">
            <div className="absolute top-[175px]  bg-gray-800 w-[1400px] h-0.5 mix-blend-normal z-[1]" />
            <h1 className="m-0 h-11 relative text-inherit tracking-[-0.11px] font-bold font-inherit inline-block z-[2] mq1050:text-[26px] mq450:text-[19px]">
              User
            </h1>
          </div>

          <OrderList />
        </main>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default User;
