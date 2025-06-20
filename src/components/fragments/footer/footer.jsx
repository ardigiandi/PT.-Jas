import React from "react";

function Footer() {
  return (
    <div className="relative w-full bg-oren flex flex-wrap justify-between items-center lg:px-20 gap-12 lg:gap-0 px-5 lg:py-24 py-28">
      <img
        src="/assets/Titik-titik.png"
        alt=""
        className="absolute top-0 lg:left-14 w-[130px] h-[100px] "
      />
      <div className="flex flex-col">
        <img src="/assets/logo-white.png" alt="" className="w-[120px]" />
        <p className="text-white text-base w-[235px]">
          Hak Cipta © 2025 PT Jas Seluruh hak cipta dilindungi.
        </p>
        {/* <div className="flex gap-4 mt-5">
          <a
            href="https://wa.me/6287887772919"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/whatsapp.png"
              alt="WhatsApp"
              className="w-[27px] h-[27px]"
            />
          </a>
        </div> */}
      </div>
      <div className="flex gap-28">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-semibold">Perusahaan</h1>
          <ul>
            <li className="flex flex-col gap-2 mt-5">
              <a href="/#about" className="text-white text-base">
                Tentang Kami
              </a>
              <a href="/#services" className="text-white text-base">
                Services
              </a>
              <a href="/#cta" className="text-white text-base">
                Kontak Kami
              </a>
              <a href="/#portofolio" className="text-white text-base">
                portofolio
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="flex flex-col">
          <h1 className="text-white text-xl font-semibold">Support</h1>
          <ul>
            <li className="flex flex-col gap-2 mt-5">
              <a href="#" className="text-white text-base">
                Help center
              </a>
              <a href="#" className="text-white text-base">
                Terms of service
              </a>
              <a href="#" className="text-white text-base">
                Legal
              </a>
              <a href="#" className="text-white text-base">
                Privacy policy
              </a>
            </li>
          </ul>
        </div> */}
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
