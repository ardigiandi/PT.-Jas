import React from "react";

function Klien() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 mt-[130px]">
      <h1 className="text-[28px] font-semibold bg-oren w-fit mx-auto px-2 py-1">
        Klien Kami
      </h1>
      <p className="text-base text-gray-500 text-center mt-2">
        Kami bangga telah mendukung berbagai bisnis terkemuka di industri
        kuliner.
      </p>
      <div className="flex flex-wrap justify-center gap-14 lg:gap-24 mt-9 px-0 md:px-14">
        <img
          src="/assets/dookki.png"
          alt="Dookki"
          className="lg:w-[120px] w-[120px]"
        />
        <img
          src="/assets/sulawesi_kemang.png"
          alt="Sulawesi"
          className="lg:w-[120px] w-[120px]"
        />
        <img
          src="/assets/caffetutti.png"
          alt="Tutti"
          className="lg:w-[120px] w-[120px]"
        />
        <img
          src="/assets/sabore.png"
          alt="Sabore"
          className="lg:w-[120px] w-[120px]"
        />
        <img
          src="/assets/latteria.png"
          alt="Latteria"
          className="lg:w-[120px] w-[120px]"
        />
        {/* <img src="/assets/kikkoman.png" alt="Kikkoman" className="lg:w-[120px] w-[120px]" /> */}
        {/* <img src="/assets/bumiaki.png" alt="Bumi Aki" className="lg:w-[160px] w-[120px]" />
        <img
          src="/assets/fleudelys.png"
          alt="Fleudelys"
          className="lg:w-[160px] w-[120px]"
        />
        <img src="/assets/shao_ao.png" alt="Shaokao" className="lg:w-[160px] w-[120px]" />
        <img src="/assets/mujigae.png" alt="Mujigae" className="lg:w-[160px] w-[120px]" />
        <img src="/assets/tugulara.png" alt="Tugu" className="lg:w-[160px] w-[120px]" />
        <img src="/assets/madera.png" alt="Madera" className="lg:w-[160px] w-[120px]" />
        <img src="/assets/matteo.png" alt="Matteo" className="lg:w-[160px] w-[120px]" /> */}
      </div>
    </div>
  );
}

export default Klien;
