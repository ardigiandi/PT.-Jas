import React from "react";

function Footer() {
  return (
    <div className="relative w-full bg-oren flex flex-wrap justify-between items-center lg:px-20 gap-12 lg:gap-0 px-5 lg:py-24 py-28">
      {/* <img
        src="/assets/pattern.svg"
        alt=""
        className="absolute top-0 lg:left-14 w-[200px] h-[100px] "
      /> */}
      <div className="flex flex-col">
        <img src="/assets/logo-white.png" alt="" className="w-[120px]" />
        <p className="text-white text-base w-[240px]">
          Copyright © 2020 Nexcent ltd. All rights reserved
        </p>
        <div className="flex gap-4 mt-5">
          <img src="/assets/ig.svg" alt="" />
          <img src="/assets/x.svg" alt="" />
          <img src="/assets/yt.svg" alt="" />
        </div>
      </div>
      <div className="flex gap-28">
        <div className="flex flex-col">
          <h1 className="text-white text-xl font-semibold">Company</h1>
          <ul>
            <li className="flex flex-col gap-2 mt-5">
              <a href="#" className="text-white text-base">
                Tentang Kami
              </a>
              <a href="#" className="text-white text-base">
                Services
              </a>
              <a href="#" className="text-white text-base">
                Kontak Kami
              </a>
              <a href="#" className="text-white text-base">
                Testimonials
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
      {/* <img
        src="/assets/pattern.svg"
        alt=""
        className="absolute bottom-0 lg:right-14 right-0 w-[200px] h-[100px] "
      /> */}
    </div>
  );
}

export default Footer;
