import { Button } from "@/components/ui/button";
import React from "react";

function TentangKami() {
  return (
    <div className="mt-[150px]  flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between items-center max-w-6xl mx-auto px-5 md:px-0">
      <img
        src="/assets/depan.png"
        alt=""
        className="lg:w-[441px] w-full rounded-md "
      />
      <div className="flex flex-col gap-4 w-full lg:w-[601px] items-start">
        <h1 className="text-4xl font-bold text-abu">Tentang Kami</h1>
        <p className="text-base text-gray-500">
          Perkembangan industry kuliner dan UMKM di Indonesia yang terus
          meningkat khususnya sektor Hotel, Restoran, Catering, Rumah Sakit dll
          (Horeca) menyebabkan permintaan akan peralatan dapur dan mesin
          pendingin komersial cukup tinggi, oleh karena itu pada bulan nopember
          Tahun 2019 PT. Jaya Abadi Suksesama (Jas Kitchen) didirikan. berawal
          sebagai supplier peralatan dapur komersial berbagia merk dengan harga
          terjangkau guna memenuhi permintaan pasar.
        </p>
        <Button>Learn More</Button>
      </div>
    </div>
  );
}

export default TentangKami;
