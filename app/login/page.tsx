"use client";

import { useState } from "react";
import * as Image from "../../public/images";
import Header from "../components/header";
import Footer from "../components/footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [IsRemember, setIsRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-full min-w-full space-y-[90px]">
      <Header />
    </div>
  );
};

export default LoginPage;
