"use client";
import { useState } from "react";
import * as Images from "../../public/images";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Kazakh");
  const [selectedCity, setSelectedCity] = useState("Астана");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const languages = [
    { id: 1, name: "Kazakh", icon: <Images.FlagKaz /> },
    {
      id: 2,
      name: "Russian",
      icon: <Images.FlagRu />,
    },
  ];

  const cities = [
    { id: 1, name: "Астана" },
    { id: 2, name: "Алматы" },
    { id: 3, name: "Шымкент" },
    { id: 4, name: "Орал" },
    { id: 5, name: "Қарағанды" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  return (
    <header className="min-w-full">
      <div className="w-[1440px] mx-auto mt-6 space-y-3">
        <section className="flex flex-row justify-between">
          <div className="relative flex items-center space-x-2">
            <Images.Location className="w-[17px] h-[17px]" />
            {/* <a className="underline underline-offset-2 pr-2">Астана</a> */}
            <a
              onClick={toggleCityDropdown}
              className="underline underline-offset-2 pr-2 cursor-pointer"
            >
              {selectedCity}
            </a>

            {isCityDropdownOpen && (
              <div className="absolute top-6 left-3 w-[150px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-2 flex flex-col gap-1">
                  {cities.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city.name);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`flex items-center justify-around rounded py-1 mx-2 cursor-pointer ${
                        selectedCity === city.name
                          ? "bg-[#1aa68383] text-white"
                          : ""
                      }`}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a className="underline underline-offset-2">Объявления</a>
          </div>
          <div className="relative flex items-center space-x-5">
            <Images.Light className="w-[24px] h-[24px]" />
            <div
              className="flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              {languages.find((lang) => lang.name === selectedLanguage)?.icon}
              <Images.Vector className="w-[16px] h-[16px]" />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 top-7 w-[120px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-2 flex flex-col gap-1">
                  {languages.map((i) => (
                    <li
                      key={i.id}
                      onClick={() => {
                        setSelectedLanguage(i.name);
                        toggleDropdown();
                      }}
                      className={`flex items-center justify-around rounded py-1 mx-2 cursor-pointer ${
                        selectedLanguage === i.name
                          ? "bg-[#1aa68383] text-white"
                          : ""
                      }`}
                    >
                      {i.icon}
                      {i.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Images.Logo className="w-[50px] h-[50px]" />
            <h1 className="font-circular font-semibold text-[28px] leading-[38px]">
              Şañyraq
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="font-circular flex items-center justify-around p-2 h-[60px] bg-white border border-gray-300 rounded-md shadow-md w-[460px]">
              <div className="flex px-4 items-center border-r-2 text-[#252525] font-medium text-[16px] leading-5">
                {selectedCity}
              </div>
              <div className="flex px-4 border-r-2 text-[#252525] font-medium text-[16px] leading-5">
                150 000-200 000
              </div>
              <div className="flex items-center px-4 text-[#252525] font-medium text-[16px] leading-5">
                3 жителей
              </div>
              <button className="flex justify-center items-center w-[30px] h-[30px] bg-[#1aa683] rounded">
                <Images.searchIcon className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button className="flex justify-center items-center space-x-2 bg-[#1aa683] text-white font-bold w-[246px] h-[50px] rounded">
              <span>Подать объявление</span>
              <Images.ArrowRight className="w-[20px] h-[20px]" />
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};
export default Header;
