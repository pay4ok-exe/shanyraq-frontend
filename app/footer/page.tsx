"use client";
import * as Images from "../../public/images";
import Header from "../header/page";

const Footer = () => {
  return (
    <footer className="min-w-full h-[500px] flex flex-col justify-between">
      <Header />
      <div className="w-[1440px] mx-auto mt-6 space-y-3">
        <section className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Images.Logo className="w-[50px] h-[50px]" />
            <h1 className="font-circular font-semibold text-[28px] leading-[38px] text-black">
              Şañyraq
            </h1>
          </div>
          <div className="font-medium text-[16px] leading-[20px] text-[#b5b7c0]">
            © 2024 shanyraq.kz, все права защищены
          </div>
          <div className="flex space-x-2">
            <Images.TelegramIcon className="w-[28px] h-[28px]" />
            <Images.InstagramIcon className="w-[28px] h-[28px]" />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
