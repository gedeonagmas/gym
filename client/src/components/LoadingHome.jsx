import React from "react";
import Logo from "../images/logo/logo.svg";

const LoadingHome = () => {
  return (
    <div className="fixed top-0 gap-2 flex flex-col text-[16px] items-center justify-center left-0 z-50 bg-white w-full h-full">
      <div className="w-[200px] h-[60px] relative px-2 py-2 rounded-xl bg-[#ff0335]">
        <img src={Logo} alt="GYMATE" className="w-full h-full" />
      </div>
      <div className="w-[200px] bg-white rounded-md border-2 relative border-[#ff0336] text-white h-5">
        <div
          className={`h-[8px] bg-[#ff0446] absolute top-0 left-0 w-32`}
        ></div>
      </div>
    </div>
  );
};

export default LoadingHome;
