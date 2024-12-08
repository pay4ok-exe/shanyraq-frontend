import React, { useEffect, useState } from "react";
import Card from "@/app/profile/Card";
import axiosInstance from "@/axiosInstance/axios";
import { useModal } from "@/app/context/modal-context";

const MyAnnouncements = () => {
  const [activeButton, setActiveButton] = useState<"active" | "archived">(
    "active"
  );
  const [announcements, setAnnouncements] = useState([]);

  const fetchAllAnnouncements = async () => {
    try {
      const endpoint =
        activeButton === "active"
          ? "/announcement/my-active-announcements"
          : "/announcement/my-archive-announcements";

      const response = await axiosInstance.get(endpoint);
      console.log(activeButton === "active");

      // Assuming response.data is an array of announcements
      setAnnouncements(response.data || []);
    } catch (error: any) {
      console.error(
        "Error fetching announcements:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to fetch announcements");
    }
  };

  const handleArchieve = async (id: number) => {
    try {
      const response = await axiosInstance.post(
        `/announcement/archive-announcement/${id}`
      );
      console.log("Archive response:", response.data); // Log success response

      // Assuming the API returns success or updated announcements, update the state
      alert("Announcement archived successfully!");

      // Optional: Update announcements state if necessary
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter(
          (announcement) => announcement.announcementId !== id
        )
      );
    } catch (error: any) {
      console.error(
        "Error archiving announcement:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message || "Failed to archive the announcement."
      );
    }
  };

  const handleRestore = async (id: number) => {
    try {
      const response = await axiosInstance.post(
        `/announcement/restore-announcement/${id}`
      );
      console.log("Restore response:", response.data); // Log success response

      // Assuming the API returns success or updated announcements, update the state
      alert("Announcement restored successfully!");

      // Optional: Update announcements state if necessary
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter(
          (announcement) => announcement.announcementId !== id
        )
      );
    } catch (error: any) {
      console.error(
        "Error restoring announcement:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message || "Failed to restore the announcement."
      );
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        `/announcement/delete-announcement/${id}`
      );
      console.log("Delete response:", response.data); // Log success response

      // Assuming the API returns success or updated announcements, update the state
      alert("Announcement deleted successfully!");

      // Optional: Update announcements state if necessary
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter(
          (announcement) => announcement.announcementId !== id
        )
      );
    } catch (error: any) {
      console.error(
        "Error deleting announcement:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message || "Failed to delete the announcement."
      );
    }
  };

  const { openModal } = useModal();
  const handleEdit = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/announcement/detail/${id}`);
      // console.log("Detail response:", response.data);
      const announcementData = response.data;
      // console.log(announcementData);
      sessionStorage.setItem(
        `announcement_details`,
        JSON.stringify(announcementData)
      );
      openModal();
    } catch (error: any) {
      console.error(
        "Error Detail get announcement:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message ||
          "Failed to Detail get the announcement."
      );
    }
  };

  useEffect(() => {
    setAnnouncements([]);
    fetchAllAnnouncements();
  }, [activeButton]);

  const handleShareClick = () => {
    console.log("Share clicked!");
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
              : "bg-white text-[#b5b7c0] border border-gray-300 border-l-0"
          } text-sm font-semibold px-[70px] py-3 rounded-r-lg`}
          onClick={() => setActiveButton("archived")}>
          Архивированные
        </button>
      </div>

      {/* Display announcements based on the active button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {announcements &&
          announcements.map((announcement: any) => (
            <Card
              key={announcement.announcementId}
              card={announcement}
              handleArchieve={handleArchieve}
              handleRestore={handleRestore}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isArchieved={activeButton === "active"}
            />
          ))}
      </div>
    </div>
  );
};

export default MyAnnouncements;
