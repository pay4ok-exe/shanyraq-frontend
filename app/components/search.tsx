"use client";
import * as Images from "../../public/images";

import { useState } from "react";

const Search = () => {
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [housemates, setHousemates] = useState("");

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isHousematesDropdownOpen, setIsHousematesDropdownOpen] =
    useState(false);

  // Toggle functions for opening and closing dropdowns
  const toggleCityDropdown = () => setIsCityDropdownOpen(!isCityDropdownOpen);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
  const toggleGenderDropdown = () =>
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  const toggleHousematesDropdown = () =>
    setIsHousematesDropdownOpen(!isHousematesDropdownOpen);

  const toggleAllDropDown = () => {
    setIsCityDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsGenderDropdownOpen(false);
    setIsHousematesDropdownOpen(false);
  };

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

  const genders = [
    { id: 1, name: "Мужской" },
    { id: 2, name: "Женский" },
  ];

  const housematesCount = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5+" },
  ];

  return (
    <div className="w-full mt-[40px] flex justify-center">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-between items-center">
        <div className="flex gap-[5px]">
          <div className="relative">
            <div
              className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
              <div className="flex items-center gap-[12px]">
                <Images.Location w={"20"} h={"20"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  Выберите город
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>
          </div>

          <div
            className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
            <div className="flex items-center gap-[12px]">
              <Images.money w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Выберите цену
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div className="relative">
            <div
              className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                toggleAllDropDown();
                toggleGenderDropdown();
              }}>
              <div className="flex items-center gap-[12px]">
                <Images.user w={"18"} h={"18"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  {gender || "Выберите пол"}
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>

            {isGenderDropdownOpen && (
              <div
                className="absolute top-[60px] left-0 px-[20px] pb-[12px] pt-[20px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left"
                style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
                <p className="text-[14px] font-normal leading-[17.5px] text-left text-[#252525]">
                  Выберите пол
                </p>

                <ul className="flex flex-col">
                  {genders.map((g) => (
                    <li
                      key={g.id}
                      onClick={() => {
                        setGender(g.name);
                        // setIsGenderDropdownOpen(false);
                      }}
                      className={`${
                        g.name === gender
                          ? "bg-[#D1EDE6] text-[#1AA683]"
                          : "bg-white text-[#252525]"
                      } w-full px-[12px] py-[4px] rounded-[5px] cursor-pointer font-normal text-[14px] leading-[17.5px]`}>
                      {g.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className="w-[230px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                toggleAllDropDown();
                toggleHousematesDropdown();
              }}>
              <div className="flex items-center gap-[12px]">
                <Images.group w={"18"} h={"18"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  {housemates || "Количество сожителей"}
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>
            {isHousematesDropdownOpen && (
              <div className="absolute top-[60px] left-0 p-[20px] bg-white space-y-[24px] min-w-[230px] rounded-[5px] text-left">
                <p className="text-[14px] font-normal leading-[17.5px] text-left text-[#5c5c5c]">
                  Количество сожителей
                </p>

                <ul className="flex justify-between space-x-[7px]">
                  {housematesCount.map((room) => (
                    <li
                      key={room.id}
                      onClick={() => {
                        setHousemates(room.name);
                        // setIsHousematesDropdownOpen(false);
                      }}
                      className={`${
                        housemates == room.name
                          ? "bg-[#1AA683] text-[#FFFFFF]"
                          : "bg-[#D1EDE6] text-[#5c5c5c]"
                      } flex items-center justify-center px-[12px] py-[4px] rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px] `}>
                      {room.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <button
          className="w-[50px] h-[50px] flex items-center justify-center bg-[#32343A] rounded-[5px] cursor-pointer"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
          <Images.search />
        </button>
      </form>
    </div>
  );
};

export default Search;
