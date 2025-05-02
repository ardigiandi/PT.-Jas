import React from "react";

function Footer() {
  return (
    <div className="mt-[200px] bg-oren flex flex-wrap justify-between items-center px-20 py-16">
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
                Blog
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
        <div className="flex flex-col">
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
        </div>
      </div>
    </div>
  );
}

export default Footer;
