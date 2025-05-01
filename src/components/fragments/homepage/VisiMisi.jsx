import React from "react";

function VisiMisi() {
  return (
    <div className="mt-[200px] max-w-6xl mx-auto px-4 md:px-0">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl leading-snug text-center lg:w-[490px] font-semibold">
          Visi dan Misi
        </h1>
        <p className="text-base text-gray-500">
          PT JAS mendukung UMKM dan pertumbuhan ekonomi dengan produk
          berkualitas dan pelayanan terbaik.
        </p>
      </div>
      <div className="mt-9 flex flex-wrap justify-center gap-6 lg:gap-5">
        <CardPage
          // image="/assets/manage1.svg"
          title="Visi"
          description="Membantu pertumbuhan perkonomian indonesia khususnya di industry kuliner dan UMKM dengan menyediakan produk lokal (custom stainless) dan peralatan dapur komersial   yang terjangkau dan bermutu."
        />
        <CardPage
          // image="/assets/manage2.svg"
          title="Misi"
          description="Membantu meningkatkan penjualan perusahaan dengan  memberikan pelayanan suplai barang  berbagai macam merk berkualitas  dengan harga terjangkau dan memberikan pelayanan purna jual yang baik."
        />
      </div>
    </div>
  );
}

const CardPage = ({ image, title, description }) => {
  return (
    <div
      className="flex flex-col gap-4 px-5 items-center w-[45%] h-full rounded-md  justify-center lg:justify-start py-5 bg-white dark:bg-abu
     shadow-soft"
    >
      {/* <img src={image} alt="" className="w-[65px] h-[65px]" /> */}
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-center text-sm">{description}</p>
    </div>
  );
};

export default VisiMisi;
