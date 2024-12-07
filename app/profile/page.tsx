"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import * as Images from "@/public/images";
import Progress from "@/components/progress";
import ProfilePage from "./profile";
import MyAnnouncements from "@/components/my-announcements";
import MenuItem from "@/components/ui/MenuItem";
import axiosInstance from "@/axiosInstance/axios";
import { useRouter } from "next/navigation";

export default function ProfilesPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    photo: "",
    hasPassword: false,
  });
  const [isModalShow, setIsModalShow] = useState(false);

  // Single state for all password fields
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Single state for visibility toggles of each password field
  const [passwordVisibility, setPasswordVisibility] = useState({
    new: false,
    confirm: false,
  });

  const openModal = () => {
    // Reset password fields and open modal
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setIsModalShow(true);
  };

  const closeModal = () => {
    setIsModalShow(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { newPassword, confirmPassword } = passwordData;
      if (newPassword !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
      const response = await axiosInstance.post("/profile/add-password", {
        password: newPassword,
      });

      console.log("Password changed successfully", response);
      fetchProfile();

      closeModal();
    } catch (error: any) {
      console.error(
        "Entered incorrect password :",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Entered incorrect password!");
    }
    // Passwords match, handle updating formData or actual logic here
  };

  const handlePasswordChange = (
    field: "newPassword" | "confirmPassword",
    value: string
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };
  const toggleVisibility = (field: "old" | "new" | "confirm") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      const data = response.data;

      setFormData((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phoneNumber || "",
        birthDate: data.birthDate || "",
        gender: data.gender || "",
        photo: data.profilePhoto || "",
        hasPassword: data.isPasswordHas || false,
      }));
      
      if (!data.isPasswordHas) openModal();
    } catch (error: any) {
      console.error("Failed to fetch profile:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    // Fetch profile data when the component mounts

    fetchProfile();
  }, []);

  const [activeItem, setActiveItem] = useState("profile");
  const [value, setValue] = useState(20);

  return (
    <div className="min-h-screen flex flex-col gap-[35px]">
      <Header isFilterResults={true} />
      <div className="w-full max-w-[1300px] mx-auto px-4 flex-grow mt-[35px]">
        <Progress value={value} />
        <div className="flex w-full gap-10 mt-[35px]">
          <div className=" bg-white rounded-[10px] border-[1px] border-[#B5B7C0] w-[300px] max-h-[700px] sticky top-[40px]">
            <div className="flex justify-center mt-[30px]">
              <div className="w-[130px] h-[130px] rounded-full overflow-hidden relative">
                {formData.photo ? (
                  <Image
                    src={formData.photo}
                    alt="User Photo"
                    width={130}
                    height={130}
                    className="object-cover"
                  />
                ) : (
                  <Images.userPhoto h={"130"} w={"130"} />
                )}
                <button className="absolute bottom-[20px] right-[10px] bg-[#252525] p-[5px] rounded-full text-white shadow-lg ">
                  <Images.userPhotoEdit />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-5 mb-20">
              <p className="font-circular font-medium text-[#252525] leading-[20px] tracking-[0.2px] text-left">
                {`${formData.firstName || "user"}  ${formData.lastName || ""}`}
              </p>
            </div>
            <nav className="space-y-7">
              <MenuItem
                label="Профиль"
                isactive={activeItem === "profile"}
                onClick={() => setActiveItem("profile")}>
                <Image
                  src={"/user.svg"}
                  alt="Profile Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Мои отклики"
                isactive={activeItem === "responses"}
                onClick={() => setActiveItem("responses")}>
                <Image
                  src={"/reply.svg"}
                  alt="Responses Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Мои объявления"
                isactive={activeItem === "my-announcements"}
                onClick={() => setActiveItem("my-announcements")}>
                <Image
                  src={"/announcement.svg"}
                  alt="Announcement Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Анкета"
                isactive={activeItem === "questionnaire"}
                onClick={() => setActiveItem("questionnaire")}>
                <Image
                  src={"/edit.svg"}
                  alt="Questionnaire Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
            </nav>
          </div>

          {/* Profile Form */}
          {activeItem === "profile" && (
            <ProfilePage formData={formData} setFormData={setFormData} fetchProfile={fetchProfile} />
          )}

          {activeItem === "responses" && (
            <div className="flex-auto bg-white rounded-[10px] border-[1px] border-[#B5B7C0] w-full p-8 h-[562px]">
              {" "}
            </div>
          )}

          {activeItem === "my-announcements" && <MyAnnouncements />}

          {activeItem === "questionnaire" && (
            <div className="flex-auto bg-white rounded-[10px] border-[1px] border-[#B5B7C0] w-full p-8 h-[562px]  ">
              {" "}
            </div>
          )}
        </div>
      </div>

      {isModalShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-6 text-[#252525]">
              Добавьте свой пароль
            </h2>

            {/* Новый пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.new ? "text" : "password"}
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1AA683]"
              />
              <label
                htmlFor="newPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1AA683] ${
                  passwordData.newPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}>
                Новый пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.newPassword}
                onClick={() => toggleVisibility("new")}>
                {!passwordVisibility.new ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.newPassword ? "#1AA683" : "gray"}`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.newPassword ? "#1AA683" : "gray"}`}
                  />
                )}
              </button>
            </div>

            {/* Подтвердите пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.confirm ? "text" : "password"}
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1AA683]"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1AA683] ${
                  passwordData.confirmPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}>
                Подтвердите пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.confirmPassword}
                onClick={() => toggleVisibility("confirm")}>
                {!passwordVisibility.confirm ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${
                      passwordData.confirmPassword ? "#1AA683" : "gray"
                    }`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordVisibility.confirm ? "#1AA683" : "gray"}`}
                  />
                )}
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="bg-[#1aa683] text-white px-6 py-2 rounded-lg hover:bg-[#158f72] w-full text-center">
                Подтвердить
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 w-full text-center">
                Отменить
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
