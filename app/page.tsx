"use client";

import Filter from "@/components/filter";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import * as Images from "@/public/images";
import Link from "next/link";
import HomeCard from "@/components/home-card";
import Map from "@/components/Map";
import { useAnnouncements } from "@/hooks/useAnnouncements";

const sortMapping = {
  "Самые подходящие": 1,
  "По возрастанию цены": 2,
  "По новизне": 3,
  "По убыванию цены": 4,
};

export default function Home() {
  const [query, setQuery] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialQuery, setInitialQuery] = useState<any>(null);
  const [viewType, setViewType] = useState<"lists" | "map">("lists");
  const [selectedSort, setSelectedSort] = useState<string>("Самые подходящие");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isMapDropdownOpen, setMapDropdownOpen] = useState<boolean>(false);
  const [isFilterVisible, setFilterVisible] = useState(true);

  // Hook that manages announcements fetching and filters
  const { announcements, updateFilters, loading, error } = useAnnouncements();

  const handleFilterSubmit = (queryObject: any) => {
    // queryObject matches the swagger schema from your backend
    setQuery(queryObject);
  };

  // Whenever query, selectedSort or viewType changes, update the filters
  useEffect(() => {
    const sortValue = sortMapping[selectedSort] || 1;

    // If we have a query, extract filters from it. Otherwise, just use sorting and viewType.
    if (query) {
      updateFilters({
        regionOrCityName: query.region || "",
        districtName: query.district || "",
        microDistrictName: query.microDistrict || "",
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        gender: query.gender,
        roommatesCount: query.roommatesCount,
        sort: sortValue,
        viewType: viewType,
      });
    } else {
      // No query means just use the default or currently chosen sorting and viewType
      updateFilters({
        sort: sortValue,
        viewType: viewType,
      });
    }
  }, [query, selectedSort, viewType, updateFilters]);

  useEffect(() => {
    // If useAnnouncements provides an error state, map it to errorMessage
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage("");
    }
  }, [error]);

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const toggleMapDropdown = () => {
    setMapDropdownOpen(true);
    setViewType("map");
  };

  const handleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="min-h-full min-w-full space-y-[40px]">
      <Header isFilterResults={false} />

      {isMapDropdownOpen ? (
        <div className="relative w-full h-[90vh]">
          {/* Map Background */}
          <div className="absolute inset-0 z-0">
            <Map announcements={announcements} />
          </div>

          {/* Filter in the Foreground */}
          {isFilterVisible && (
            <div className="absolute left-10 top-5 z-10 bg-white p-4 rounded-lg shadow-lg flex flex-col items-end">
              <button
                onClick={handleFilterVisibility}
                className="text-gray-600 hover:text-gray-900 text-2xl mb-[10px]">
                <Images.close />
              </button>
              <Filter
                onSubmit={handleFilterSubmit}
                initialQuery={initialQuery}
              />
            </div>
          )}

          {/* "To List View" Button */}
          <div className="absolute top-10 right-10 z-10 flex gap-4">
            <button
              onClick={handleFilterVisibility}
              className="bg-white text-black px-5 py-4 rounded-lg border-[1px] border-[#BFBFBF4D] text-[24px]">
              <Images.filterIcon />
            </button>
            <button
              onClick={() => {
                setMapDropdownOpen(false);
                setViewType("lists");
              }}
              className="bg-white text-black px-10 py-4 rounded-lg border-[1px] border-[#BFBFBF4D] text-[24px]">
              Списком
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow w-[1300px] mx-auto">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {loading && <div>Загрузка...</div>}

          <div className="flex justify-between gap-[45px]">
            <Filter onSubmit={handleFilterSubmit} initialQuery={initialQuery} />
            <div className="flex flex-col w-full gap-[12px] ">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <div
                    className="flex items-center gap-[12px] cursor-pointer"
                    onClick={toggleSortDropdown}>
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#5c5c5c]">
                      {selectedSort}
                    </p>
                    <Images.arrowDown w={"20"} h={"20"} color={"#5c5c5c"} />
                  </div>
                  {isSortDropdownOpen && (
                    <div className="absolute top-[30px] left-[-10px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left z-10">
                      <ul className="flex flex-col">
                        {Object.keys(sortMapping).map((sortOption) => (
                          <li
                            key={sortOption}
                            onClick={() => {
                              setSelectedSort(sortOption);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`${
                              sortOption === selectedSort
                                ? "bg-[#D1EDE6] text-[#1AA683]"
                                : "bg-white text-[#252525]"
                            } w-full px-[12px] py-[4px] rounded-[5px] cursor-pointer font-normal text-[14px] leading-[17.5px]`}>
                            {sortOption}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button type="button" onClick={toggleMapDropdown}>
                  <Images.map />
                </button>
              </div>
              <div className="flex justify-center">
                {announcements && announcements.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {announcements.map((announcement: any) => (
                      <Link
                        href={`/announcement/${announcement.announcementId}`}
                        key={announcement.announcementId}>
                        <HomeCard card={announcement} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  !loading && <div>Нет объявлений</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
