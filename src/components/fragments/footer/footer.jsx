import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className="relative w-full bg-oren flex flex-wrap justify-center items-center lg:px-20 gap-12 lg:gap-0 px-5 lg:py-24 py-28">
      <img
        src="/assets/Titik-titik.png"
        alt=""
        className="absolute top-0 lg:left-14 w-[130px] h-[100px] "
      />
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <ul className="flex gap-5">
          <li>
            <a href="/#about" className="text-base text-white">
              Tentang Kami
            </a>
          </li>
          <li>
            <a href="/#services" className="text-base text-white">
              Layanan Kami
            </a>
          </li>
          <li>
            <a href="/#cta" className="text-base text-white">
              Kontak Kami
            </a>
          </li>
          <li>
            <a href="/#portofolio" className="text-base text-white">
              portofolio
            </a>
          </li>
        </ul>

        <FaWhatsapp className="text-white w-5 h-5" />

        <div className="border-b-[1px] border-white pb-9 w-full">
          <h1 className="text-white text-[14px] text-center">
            Jl. Pasar Kecapi No.9 RT.009/RW.016, Jatirahayu, <br /> Kec. Pd.
            Melati, Kota Bks, Jawa Barat 17414
          </h1>
        </div>
        <p className="text-white text-[14px]">
          Hak Cipta © 2025 PT Jas Seluruh hak cipta dilindungi.
        </p>
      </div>
      <img
        src="/assets/Meliuk-liuk.png"
        alt=""
        className="absolute bottom-0 lg:right-0 right-0 w-[430px] h-[200px] "
      />
    </div>
  );
}

export default Footer;
