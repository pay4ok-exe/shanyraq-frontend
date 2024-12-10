import React, { useEffect, useState } from "react";
import Card from "@/app/profile/Card";
import axiosInstance from "@/axiosInstance/axios";
import { useModal } from "@/app/context/modal-context";
import Skeleton from "@mui/material/Skeleton";

const MyAnnouncements = () => {
  const [activeButton, setActiveButton] = useState<"active" | "archived">(
    "active"
  );
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllAnnouncements = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeButton === "active"
          ? "/announcement/my-active-announcements"
          : "/announcement/my-archive-announcements";

      const response = await axiosInstance.get(endpoint);

      setAnnouncements(response.data || []);
    } catch (error: any) {
      console.error(
        "Error fetching announcements:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleArchieve = async (id: number) => {
    try {
      await axiosInstance.post(`/announcement/archive-announcement/${id}`);
      alert("Announcement archived successfully!");
      fetchAllAnnouncements(); // Refresh the list
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
      await axiosInstance.post(`/announcement/restore-announcement/${id}`);
      alert("Announcement restored successfully!");
      fetchAllAnnouncements(); // Refresh the list
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
      await axiosInstance.delete(`/announcement/delete-announcement/${id}`);
      alert("Announcement deleted successfully!");
      fetchAllAnnouncements(); // Refresh the list
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
      const announcementData = response.data;
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

  return (
    <div className="flex-auto bg-white rounded-[10px] border-[1px] border-[#B5B7C0] w-full p-8 min-h-[562px]">
      <div className="flex justify-start mb-10">
        <button
          className={`${
            activeButton === "active"
              ? "border border-[#252525] hover:border-gray-500 text-[#252525]"
              : "bg-white text-[#b5b7c0] border border-gray-300 border-r-0"
          } text-sm font-semibold px-[70px] py-3 rounded-l-lg`}
          onClick={() => setActiveButton("active")}>
          Активные
        </button>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={200}
                className="rounded-lg"
              />
            ))
          : announcements.map((announcement: any) => (
              <Card
                key={announcement.announcementId}
                card={announcement}
                handleArchieve={handleArchieve}
                handleRestore={handleRestore}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isArchieved={activeButton === "archived"}
              />
            ))}
      </div>
    </div>
  );
};

export default MyAnnouncements;
