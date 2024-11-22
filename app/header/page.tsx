"use client";
import { useState } from "react";
import * as Images from "../../public/images";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Kazakh");

  const languages = [
    { id: 1, name: "Kazakh", icon: <Images.FlagKaz /> },
    {
      id: 2,
      name: "Russian",
      icon: <Images.FlagRu />,
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <header className="min-w-full">
      <div className="w-[1440px] mx-auto mt-6 space-y-3">
        <section className="flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Images.Location className="w-[17px] h-[17px]" />
            <a className="underline underline-offset-2 pr-2">Астана</a>
            <a className="underline underline-offset-2">Объявления</a>
          </div>
          <div className="flex items-center space-x-5">
            <Images.Light className="w-[24px] h-[24px]" />
            <div
              className="flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              {languages.find((lang) => lang.name === selectedLanguage)?.icon}
              <Images.Vector className="w-[16px] h-[16px]" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-24 top-14 w-[120px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
          <div className="flex flex-row justify-between">
            <button className="flex justify-center items-center space-x-2 bg-[#1aa683] text-white font-bold w-[246px] h-[50px] rounded">
              <span>Подать объявление</span>
              <Images.ArrowRight className="w-[20px] h-[20px]" />
            </button>
          </div>
        </section>
        {/* <section>
          <div>
            <img src="logo.jpg" alt="logo icon" />
            <h1>Şañyraq</h1>
          </div>
          <div>
            <button>Войти</button>
            <button>
              Подать объявление
              <img src="arrow-right.png" alt="arrow right icon" />
            </button>
          </div>
        </section> */}
      </div>
    </header>
  );
};
export default Header;
