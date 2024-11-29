"use client";
import * as Images from "../../public/images";

import { useState } from "react";

const Search = () => {
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [housemates, setHousemates] = useState("");

  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);

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

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setIsGenderModalOpen(false); // Close modal after selection
  };

  const handleGenderModalToggle = () => {
    setIsGenderModalOpen(!isGenderModalOpen); // Toggle modal visibility
  };

  return (
    <div className="w-full mt-[40px] flex justify-center">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-between items-center">
        <div className="flex gap-[5px]">
          <div
            className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
            <div className="flex items-center gap-[12px]">
              <Images.Location w={"20"} h={"20"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Выберите город
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div
            className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
            <div className="flex items-center gap-[12px]">
              <Images.money w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Выберите цену
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div
            className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
            onClick={handleGenderModalToggle}>
            <div className="flex items-center gap-[12px]">
              <Images.user w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                {gender || "Выберите пол"}
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>

          <div
            className="w-[230px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px]"
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
            <div className="flex items-center gap-[12px]">
              <Images.group w={"18"} h={"18"} />
              <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                Количество сожителей
              </p>
            </div>
            <Images.arrowDown w={"18"} h={"18"} />
          </div>
        </div>

        <button
          className="w-[50px] h-[50px] flex items-center justify-center bg-[#32343A] rounded-[5px]"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
          <Images.search />
        </button>
      </form>

      {/* Gender Modal */}
      {isGenderModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-[5px] p-[20px] w-[300px]">
            <h3 className="text-[16px] font-bold mb-[10px]">Выберите пол</h3>
            <div
              className="cursor-pointer mb-[10px] hover:bg-[#F1F1F1] p-[10px] rounded-[5px]"
              onClick={() => handleGenderSelect("Мужской")}>
              Мужской
            </div>
            <div
              className="cursor-pointer mb-[10px] hover:bg-[#F1F1F1] p-[10px] rounded-[5px]"
              onClick={() => handleGenderSelect("Женский")}>
              Женский
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
