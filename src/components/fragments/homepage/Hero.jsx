import { Link } from "react-router";
import { Button } from "../../ui/button";

function Hero() {
  return (
    <div class="relative  h-[calc(100vh-64px)] mt-[64px] w-full">
      <img
        src="/assets/hero.png"
        alt="Hero Image"
        class="absolute h-full w-full object-cover"
      />

      <div class="absolute inset-0 bg-black opacity-70"></div>

      <div class="absolute top-[170px] left-14 z-10">
        <div class="flex flex-col gap-4 w-[657px]">
          <h1 class="text-[50px] tracking-tight leading-tight font-bold text-white">
            Solusi Terbaik{" "}
            <span className="text-oren">Untuk UMKM dan Industri Kuliner</span>
          </h1>
          <p className="text-gray-300">
            Bersama PT JAS, kami menghadirkan produk berkualitas tinggi dan
            layanan andal untuk mendukung pertumbuhan bisnis Anda.
          </p>
          <Link to="/">
            <Button>Konsultasi</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
