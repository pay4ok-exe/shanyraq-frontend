import React, { useState } from "react";
import * as Images from "@/public/images";

const Progress = ({ value }) => {
  return (
    <div className="flex items-center gap-[30px]">
      <Images.warning />
      <div className="w-full">
        <div className="flex items-end gap-[8px] mb-[4px]">
          <p className="font-roboto text-[24px] font-bold leading-[30px] text-[#252525]">
            {value}%
          </p>
          <p className="text-sm font-normal leading-[17.5px] text-left text-[#25252580]">
            Заполните полностью профиль и получите доступ к функции
            &quot;Поделиться профилем&quot;
          </p>
        </div>
        <div className="w-full h-2 bg-[#EBEBEB] rounded-full">
          <div
            className="h-2 bg-[#82c8b6] rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${value}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
