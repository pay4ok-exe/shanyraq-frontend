"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/axiosInstance/axios";

interface Announcement {
  announcementId: number;
  image: string;
  title: string;
  address: string;
  arriveDate: string;
  roomCount: string;
  selectedGender: string;
  roommates: number;
  cost: number;
  coordsX: string;
  coordsY: string;
  isArchived: boolean;
}

interface Filters {
  regionOrCityName?: string;
  districtName?: string;
  microDistrictName?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: string;
  roommatesCount?: number;
  sort?: number;
  viewType?: "lists" | "map";
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Set initial filters including regionOrCityName: "Алматы" right here
  const [filters, setFilters] = useState<Filters>({
    sort: 1,
    regionOrCityName: "Алматы",
  });

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError("");
    try {
      const {
        regionOrCityName,
        districtName,
        microDistrictName,
        minPrice,
        maxPrice,
        gender,
        roommatesCount,
        sort,
        viewType = "lists",
      } = filters;

      const endpoint =
        viewType === "map" ? "/announcement/all-for-map" : "/announcement/all";

      const response = await axiosInstance.get(endpoint, {
        params: {
          region: regionOrCityName || undefined,
          district: districtName || undefined,
          microDistrict: microDistrictName || undefined,
          minPrice: minPrice ?? undefined,
          maxPrice: maxPrice ?? undefined,
          gender: gender || undefined,
          roommatesCount: roommatesCount ?? undefined,
          sort: sort ?? 1,
        },
      });

      const data: Announcement[] = response.data || [];
      setAnnouncements(data);
    } catch (err: any) {
      console.error(
        "Error fetching announcements:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [JSON.stringify(filters)]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      if (JSON.stringify(updated) !== JSON.stringify(prev)) {
        return updated;
      }
      return prev; // No change, so no setState triggered
    });
  };

  // Removed the problematic effect that called updateFilters inside it

  return {
    announcements,
    loading,
    error,
    updateFilters,
  };
};
