import NavigationTopBar from "../components/NavigationTopBar";
import FrameComponent from "../components/FrameComponent";
import Footer from "../components/Footer";
import ContainerDashboard from "../components/ContainerDashboard";

const Dashboard = () => {
  return (
    <div className="">
      <div className="w-full relative bg-white overflow-hidden flex flex-row items-start justify-start gap-[1px] tracking-[normal] text-center text-3xl text-white font-lineawesome mq1050:pl-px mq1050:pr-px mq1050:box-border">
        <div className="h-[979px] w-[238px] flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border mq1050:hidden">
          <ContainerDashboard/>
        </div>
        
        <main className="flex-1 flex flex-col items-center justify-start pt-0 pb-[550px] pr-0 pl-px box-border relative gap-[28px] max-w-[calc(100%_-_239px)] text-left text-[32px] text-gray-200 font-nunito-sans lg:pb-[357px] lg:box-border mq1050:max-w-full mq750:pb-[232px] mq750:box-border">
          <section className="w-full h-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px]">
            <div className="absolute h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] bg-ghostwhite" />
          </section>
          <NavigationTopBar />
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-5">
            <h1 className="m-0 h-11 relative text-inherit tracking-[-0.11px] font-bold font-inherit inline-block z-[2] mq1050:text-[26px] mq450:text-[19px]">
              Dashboard
            </h1>
          </div>
          <FrameComponent />
        </main>
      </div>

      <div>
        <Footer/>
      </div>

    </div>
  );
};

export default Dashboard;