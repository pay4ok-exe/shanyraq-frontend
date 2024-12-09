"use client";
import Image from "next/image";
import * as Images from "../public/images";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  card?: {
    id: number;
    title: string;
    cost: string;
    image: string;
    address: string;
    selectedGender: string;
    roomCount: number;
    roommates: number;
    arriveDate: string;
  };
  isLast?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isLast }) => {
  const router = useRouter();

  return (
    <div className="relative">
      <div
        className="min-h-[511px] min-w-[375px] rounded-[10px] p-[16px] gap-[26px] bg-white flex flex-col justify-between items-start"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
        <div className="relative">
          <Image
            src={card?.image}
            alt={card?.title}
            className="rounded-[10px] object-cover max-w-[343px] max-h-[220px]"
            width={343}
            height={220}
          />

          <div className="absolute top-2 right-2 z-10">
            <Images.share />
          </div>
        </div>

        <div className="flex flex-col gap-[24px] justify-start w-full">
          <div className="flex flex-col gap-[10px] justify-start">
            <p className="text-[20px] font-normal text-[#252525] text-left">
              {card?.title?.length > 26 ? card?.title?.substring(0, 26) + "..." : card?.title}
            </p>
            <span className="flex ">
              <Images.Location w={"20"} h={"20"} color={"#929292"} />
              <p className="text-[16px] font-[500] text-[#929292]  text-left">
                {card?.address}
              </p>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-[8px]">
              <Images.calendarCard h={"26px"} w={"26px"} />
              <p className="text-[14px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card?.arriveDate}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              <Images.apartment h={"26px"} w={"26px"} />
              <p className="text-[14px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card?.roomCount + " комната"}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              <Images.genderBoth h={"26px"} w={"26px"} />
              <p className="text-[14px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card?.selectedGender}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[8px]">
              <Images.people h={"26px"} w={"26px"} />
              <p className="text-[14px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card?.roommates}
              </p>
            </div>
          </div>

          <p className="text-[24px] font-[700] leading-[30px] text-left text-[#252525]">
            {card?.cost}
            <span className="underline decoration-solid text-[#252525]">₸</span>
          </p>
        </div>

        <span className="flex items-center">
          <p className="text-[14px] font-[700] text-[#999999] leading-[17.5px] text-left mr-[10px]">
            Узнать больше
          </p>

          <Images.ArrowRight w={"14"} h={"14"} color={"#999999"} />
        </span>
      </div>
      {isLast && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 flex items-center justify-center rounded-[10px] z-50">
          <button
            onClick={() => router.push("/")}
            className="p-[20px] px-[24px] gap-[10px] rounded-[10px] bg-[#1AA683] text-white text-[16px] font-medium">
            Смотреть все квартиры
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
