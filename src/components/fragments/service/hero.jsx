import { Link } from "react-router";
import { Button } from "../../ui/button";

function Hero() {
  return (
    <div className="relative  h-[calc(100vh-64px)] mt-[64px] w-full">
      <img
        src="/assets/service.jpg"
        alt="Hero Image"
        className="absolute h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10">
        <div className="flex flex-col gap-4 w-full lg:w-[657px] text-center">
          <h1 className="lg:text-[50px] text-4xl tracking-tight leading-tight font-bold text-white">
            Solusi Terbaik{" "}
            <span className="text-oren">Untuk UMKM dan Industri Kuliner</span>
          </h1>
          <p className="text-gray-300">
            Bersama PT JAS, kami menghadirkan produk berkualitas tinggi dan
            layanan andal untuk mendukung pertumbuhan bisnis Anda.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
