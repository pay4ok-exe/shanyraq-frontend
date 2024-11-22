"use client";
import Image from "next/image";
import light from "../assets/light.png";
import flag from "../assets/flag.png";
import vector from "../assets/vector.png";
import logo from "../assets/logo.jpg";
import location from "../assets/location.png";
import arrowright from "../assets/arrow-right.png";

const Header = () => {
  return (
    <header className="header_container">
      <section>
        <div className="header_location">
          <div>
            <Image src={location} alt="location icon" />
            <span>Астана</span>
          </div>
          <span>Объявления</span>
        </div>
        <div>
          <Image src={light} alt="light icon" />
          <div>
            <Image src={flag} alt="flag icon" />
            <Image src={vector} alt="vector icon" />
          </div>
        </div>
      </section>
      <section>
        <div>
          <Image src={logo} alt="logo icon" />
          <h1>Şañyraq</h1>
        </div>
        <div>
          <button>
            <span>ВойтиПодать объявление</span>
            <Image src={arrowright} alt="arrow right icon" />
          </button>
          <button></button>
        </div>
      </section>
    </header>
  );
};
export default Header;
