"use client";

import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Войдите в аккаунт Shanyraq!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
              className="mt-1 w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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

        <button className="w-full flex items-center justify-center border py-2 px-4 rounded-lg hover:bg-gray-100 transition">
          <img
            src="/google-icon.svg"
            alt="Google Icon"
            className="h-5 w-5 mr-2"
          />
          Войдите с помощью Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-700">
          Нужна учетная запись?{" "}
          <a href="#" className="text-teal-500 hover:underline">
            Создайте ее
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
