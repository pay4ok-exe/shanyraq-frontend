import React, { useState } from "react";
import Card from "@/components/ui/Card";

const MyAnnouncements = () => {
  const [activeButton, setActiveButton] = useState<"active" | "archived">(
    "active"
  );

  const handleShareClick = () => {
    console.log("Share clicked!");
  };

  const handleChevronClick = () => {
    console.log("Chevron clicked!");
  };

  return (
    <div className="flex-auto bg-white rounded-[10px] border-[1px] border-[#B5B7C0] w-full p-8">
      <div className="flex justify-start mb-10">
        {/* Active Button */}
        <button
          className={`${
            activeButton === "active"
              ? "border border-[#252525] hover:border-gray-500 text-[#252525]"
              : "bg-white text-[#b5b7c0] border border-gray-300 border-r-0"
          } text-sm font-semibold px-[70px] py-3 rounded-l-lg`}
          onClick={() => setActiveButton("active")}>
          Активные
        </button>

        {/* Archived Button */}
        <button
          className={`${
            activeButton === "archived"
              ? "border border-[#252525] hover:border-gray-500 text-[#252525]"
              : "bg-white text-[#b5b7c0]  border border-gray-300 border-l-0"
          } text-sm font-semibold px-[70px] py-3 rounded-r-lg`}
          onClick={() => setActiveButton("archived")}>
          Архивированные
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card
          imageUrl="https://via.placeholder.com/400"
          title="Spacious Room in Central Location"
          coords="123 Main St, City"
          date="2023"
          countOfRooms={3}
          genderOfRoommate="Any"
          numberOfRoommates={2}
          price={1200}
          onShareClick={handleShareClick}
          onChevronClick={handleChevronClick}
        />
        <Card
          imageUrl="https://via.placeholder.com/400"
          title="Spacious Room in Central Location"
          coords="123 Main St, City"
          date="2023"
          countOfRooms={3}
          genderOfRoommate="Any"
          numberOfRoommates={2}
          price={1200}
          onShareClick={handleShareClick}
          onChevronClick={handleChevronClick}
        />
        <Card
          imageUrl="https://via.placeholder.com/400"
          title="Spacious Room in Central Location"
          coords="123 Main St, City"
          date="2023"
          countOfRooms={3}
          genderOfRoommate="Any"
          numberOfRoommates={2}
          price={1200}
          onShareClick={handleShareClick}
          onChevronClick={handleChevronClick}
        />
        <Card
          imageUrl="https://via.placeholder.com/400"
          title="Spacious Room in Central Location"
          coords="123 Main St, City"
          date="2023"
          countOfRooms={3}
          genderOfRoommate="Any"
          numberOfRoommates={2}
          price={1200}
          onShareClick={handleShareClick}
          onChevronClick={handleChevronClick}
        />
        <Card
          imageUrl="https://via.placeholder.com/400"
          title="Spacious Room in Central Location"
          coords="123 Main St, City"
          date="2023"
          countOfRooms={3}
          genderOfRoommate="Any"
          numberOfRoommates={2}
          price={1200}
          onShareClick={handleShareClick}
          onChevronClick={handleChevronClick}
        />
        <Card
          imageUrl="https://via.placeholder.com/400"
          title="Spacious Room in Central Location"
          coords="123 Main St, City"
          date="2023"
          countOfRooms={3}
          genderOfRoommate="Any"
          numberOfRoommates={2}
          price={1200}
          onShareClick={handleShareClick}
          onChevronClick={handleChevronClick}
        />
      </div>
    </div>
  );
};

export default MyAnnouncements;
