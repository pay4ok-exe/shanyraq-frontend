"use client";
import * as Images from "../../public/images";

import { useState } from "react";

const Search = () => {
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [housemates, setHousemates] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      city,
      price,
      gender,
      housemates,
    });
    // Implement your search logic or API call here
  };

  return (
    <div className="w-full mt-[40px] flex justify-center">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-between items-center">
        <div className="flex gap-[5px]">
          <div className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]">
            <div className="flex items-center gap-[12px]">
              <Images.Location w={"20"} h={"20"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Выберите город
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]">
            <div className="flex items-center gap-[12px]">
              <Images.money w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Выберите цену
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]">
            <div className="flex items-center gap-[12px]">
              <Images.user w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Выберите пол
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div className="w-[230px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]">
            <div className="flex items-center gap-[12px]">
              <Images.group w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Количество сожителей
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>
        </div>

        <button className="w-[50px] h-[50px] flex items-center justify-center bg-[#32343A] rounded-[5px]">
          <Images.search />
        </button>
      </form>
    </div>
  );
};

export default Search;
