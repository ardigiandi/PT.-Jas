import React from "react";

function Client() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 mt-[200px]">
      <h1 className="text-[28px] font-semibold text-center">Klien Kami</h1>
      <p className="text-base text-gray-500 text-center">
        Kami bangga telah mendukung berbagai bisnis terkemuka di industri
        kuliner.
      </p>
      <div className="flex flex-wrap justify-center gap-9 md:gap-16 md:justify-between mt-9 px-0 md:px-14">
        <img src="/assets/dookki.png" alt="Dookki" />
        <img src="/assets/sulawesi.png" alt="Sulawesi" />
        <img src="/assets/tutti.png" alt="Tutti" />
        <img src="/assets/sabore.png" alt="Sabore" />
        <img src="/assets/latteria.png" alt="Latteria" />
        <img src="/assets/kikkoman.png" alt="Kikkoman" />
        <img src="/assets/bumiaki.png" alt="Bumi Aki" className="w-[200px]" />
        <img src="/assets/fleudelys.png" alt="Fleudelys" />
        <img src="/assets/shaokao.png" alt="Shaokao" />
        <img src="/assets/mujigae.png" alt="Mujigae" />
        <img src="/assets/tugu.png" alt="Tugu" />
        <img src="/assets/madera.png" alt="Madera" />
        <img src="/assets/matteo.png" alt="Matteo" />
      </div>
    </div>
  );
}

export default Client;
