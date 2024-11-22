"use client";

import { useState } from "react";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
        <div className="w-[450px] flex flex-col items-center">
          <h1 className="font-circular text-[32px] font-bold leading-[40px] text-center">
            Войдите в аккаунт Shanyraq!
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="my-[36px]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="temirlan10@gmail.com"
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 focus:ring-teal-500"
                />
                Запомнить меня
              </label>
              <a href="#" className="text-sm text-teal-500 hover:underline">
                Забыли пароль?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition">
              Войти
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">или</div>

          <button className="w-full flex items-center justify-center gap-2 border py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            Войдите с помощью Google
            <Image
              src="/google-icon.png"
              alt="Google Icon"
              width={17}
              height={17}
            />
          </button>

          <p className="text-center mt-6 text-sm text-gray-700">
            Нужна учетная запись?{" "}
            <a href="#" className="text-teal-500 hover:underline">
              Создайте ее
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
