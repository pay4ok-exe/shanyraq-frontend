import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/axiosInstance/axios";

type CardProps = {
  card?: {
    announcementId: number;
    title: string;
    cost: string;
    image: string;
    address: string;
    roomCount: number;
    roommates: number;
    arriveDate: string;
  };
  handleArchieve: (id: number) => void;
  handleRestore: (id: number) => void;
  handleDelete: (id: number) => void;
  isArchieved: boolean;
};

const Card: React.FC<CardProps> = ({
  card,
  handleArchieve,
  handleRestore,
  handleDelete,
  isArchieved,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-md border border-gray-300 max-w-sm p-4">
      {/* Image */}
      <div className="relative mb-4">
        <Image
          src={card.image}
          alt={card.image}
          width={400} // Adjust to your image's width
          height={160} // Adjust to your image's height
          className="w-full h-40 object-cover rounded-lg"
        />
        {/* Edit Button */}
        <div className="absolute top-2 right-2">
          <button
            // onClick={onShareClick}
            className="p-1 bg-gradient-to-b from-gray-700 via-gray-500 to-gray-400 rounded-[5px] flex items-center justify-center">
            <Image
              src={"/editInImage.svg"}
              alt="Share"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>

      <Link href={`/announcement/${card?.announcementId}`}>
        {/* Title and Location */}
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{card?.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-2 gap-2">
            <Image
              src={"/location.svg"}
              alt="Location"
              width={12}
              height={12}
              className="opacity-50"
            />
            <span>{card?.address}</span>
          </div>
        </div>

        {/* Room Details */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <div className="flex flex-col items-center text-sm text-gray-600">
            <Image
              src={"/year.svg"}
              alt="Year"
              width={20}
              height={20}
              className="opacity-50"
            />
            <span className="text-[14px] font-[400] text-[#929292]  text-left">
              {card?.arriveDate}
            </span>
          </div>
          {/* <div className="flex flex-col items-center text-sm text-gray-600">
          <Image
            src={"/apartment.svg"}
            alt="Year"
            width={20}
            height={20}
            className="opacity-50"
          />
          <span className="text-[14px] font-[400] text-[#929292]  text-left">
            {card?.roomCount} комната
          </span>
        </div> */}
          <div className="flex flex-col items-center text-sm text-gray-600">
            <Image
              src={"/genderBoth.svg"}
              alt="Year"
              width={20}
              height={20}
              className="opacity-50"
            />
            <span className="text-[14px] font-[400] text-[#929292]  text-left">
              {card?.selectedGender}
            </span>
          </div>
          <div className="flex flex-col items-center text-sm text-gray-600">
            <Image
              src={"/people.svg"}
              alt="Year"
              width={20}
              height={20}
              className="opacity-50"
            />
            <span className="text-[14px] font-[400] text-[#929292]  text-left">
              {card?.roommates} сожителя
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center mb-6">
          <span className="text-xl font-bold text-gray-800">
            {card?.cost} <u>₸</u>
          </span>
        </div>
      </Link>
      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isArchieved) handleArchieve(card?.announcementId);
            else handleRestore(card?.announcementId);
          }}
          className="border-[1px] font-semibold text-[12px] border-[#B5B7C0] text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
          {!isArchieved ? "Восстановить" : "Архивировать"}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // if (isArchieved) handleRestore(card?.announcementId);
            handleDelete(card?.announcementId);
          }}
          className="bg-gray-900 font-semibold text-[12px] text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          {isArchieved ? "Редактировать" : "Удалить"}
        </button>
      </div>
    </div>
  );
};

export default Card;
