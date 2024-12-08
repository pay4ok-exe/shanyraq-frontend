"use client";

import Filter from "@/components/filter";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import axiosInstance from "@/axiosInstance/axios";
import * as Images from "@/public/images"; // Import images
import Link from "next/link";
import Card from "@/components/card";
import HomeCard from "@/components/home-card";
import Map from "@/components/Map";

const sortMapping = {
  "Самые подходящие": 1,
  "По возрастанию цены": 2,
  "По новизне": 3,
  "По убыванию цены": 4,
};

export default function Home() {
  const [query, setQuery] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialQuery, setInitialQuery] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedSort, setSelectedSort] = useState<string>("Самые подходящие");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isMapDropdownOpen, setMapDropdownOpen] = useState<boolean>(false);

  const handleFilterSubmit = (queryObject: any) => {
    // queryObject matches the swagger schema
    console.log(queryObject);
    setQuery(queryObject);
  };

  useEffect(() => {
    // Check if there's a saved filter in sessionStorage on page load
    const savedFilter = sessionStorage.getItem("savedFilter");
    if (savedFilter) {
      // Ask user if they want to autofill their saved filter
      const userWantsToLoad = window.confirm(
        "У вас есть сохраненный фильтр. Хотите его загрузить?"
      );
      if (userWantsToLoad) {
        const parsedFilter = JSON.parse(savedFilter);
        console.log(parsedFilter);
        setInitialQuery(parsedFilter);
        setQuery(parsedFilter);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      try {
        const sortValue = sortMapping[selectedSort];
        const response = await axiosInstance.get("/announcement/all", {
          params: { sort: sortValue },
        });
        // Assuming response.data is an array of announcements
        setAnnouncements(response.data || []);
      } catch (error: any) {
        console.error(
          "Error fetching announcements:",
          error.response?.data?.message || error.message
        );
        setErrorMessage(
          error.response?.data?.message || "Failed to fetch announcements"
        );
      }
    };

    fetchAllAnnouncements();
  }, [selectedSort]);

  useEffect(() => {
    if (query) {
      // Example GET request using query parameters
      // If your backend expects POST with JSON, use axiosInstance.post("/announcement/search", query)
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/announcement/filter", {
            params: query,
          });
          setAnnouncements(response.data || []);
          setErrorMessage("");
        } catch (error: any) {
          console.error(
            "Error fetching announcements:",
            error.response?.data?.message || error.message
          );
          setErrorMessage(
            error.response?.data?.message || "Failed to fetch announcements"
          );
        }
      };

      fetchData();
    }
  }, [query]);

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };
  const toggleMapDropdown = () => {
    setMapDropdownOpen(!isMapDropdownOpen);
  };

  return (
    <div className="min-h-full min-w-full space-y-[40px]">
      <Header isFilterResults={false} />

      {isMapDropdownOpen ? (
        <div className="relative w-full h-[90vh]">
          {/* Map in the background with a higher z-index */}
          <div className="absolute inset-0 z-0">
            <Map />
          </div>

          {/* Filter and "To List View" button in the foreground with a lower z-index */}
          <div className="absolute top-0 left-0 right-0 z-10 w-[1300px] mx-auto flex justify-between items-start p-4">
            <Filter onSubmit={handleFilterSubmit} initialQuery={initialQuery} />
            <button
              onClick={() => setMapDropdownOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
              Списком
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow w-[1300px] mx-auto">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <div className="flex justify-between gap-[45px]">
            <Filter onSubmit={handleFilterSubmit} initialQuery={initialQuery} />
            <div className="flex flex-col w-full gap-[12px] ">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <div
                    className="flex items-center gap-[12px] cursor-pointer"
                    onClick={toggleSortDropdown}>
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#5c5c5c">
                      {selectedSort}
                    </p>
                    <Images.arrowDown w={"20"} h={"20"} color={"#5c5c5c"} />
                  </div>
                  {isSortDropdownOpen && (
                    <div className="absolute top-[30px] left-[-10px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left z-10">
                      <ul className="flex flex-col">
                        {[
                          "Самые подходящие",
                          "По возрастанию цены",
                          "По новизне",
                          "По убыванию цены",
                        ].map((sortOption) => (
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
                {announcements && announcements.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {announcements.map((announcement: any, index: number) => (
                      <Link
                        href={`/announcement/${announcement.announcementId}`}
                        key={announcement.announcementId}>
                        <HomeCard card={announcement} />
                      </Link>
                    ))}
                  </div>
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
