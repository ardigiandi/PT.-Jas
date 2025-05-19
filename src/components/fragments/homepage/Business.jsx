import React from "react";

const services = [
  {
    image: "/assets/Installation.svg",
    title: "1,200+",
    description: "Proyek berhasil dipasang.",
  },
  {
    image: "/assets/Repair.svg",
    title: "900+",
    description: "Servis dan perbaikan.",
  },
  {
    image: "/assets/Consultation.svg",
    title: "500+",
    description: "Konsultasi profesional.",
  },
  {
    image: "/assets/Clients.svg",
    title: "5,000+",
    description: "Klien puas layanan kami.",
  },
];

function BusinessPage() {
  return (
    <div className="bg-[#F3F3F3] h-full mt-[150px] px-8 lg:px-[100px] py-[84px]">
      <div className="flex flex-col lg:flex-row gap-7 lg:gap-0 items-center justify-between">
        <div className="flex flex-col gap-4 w-full lg:w-[430px]">
          <h1 className="text-4xl font-bold leading-snug">
            Solusi Terbaik untuk <span className="text-orange-500">Kebutuhan Anda</span>
          </h1>
          <p className="text-base text-gray-600">
            Kami menyediakan layanan profesional dalam pemasangan, perbaikan, dan konsultasi
            untuk berbagai kebutuhan proyek Anda.
          </p>
        </div>
        <div className="flex flex-wrap gap-10 w-full lg:w-[400px] h-full lg:h-[200px] justify-center lg:justify-between">
          {services.map((item, index) => (
            <div key={index} className="flex gap-3 items-center">
              {/* <img src={item.image} alt={item.description} className="w-[48px]" /> */}
              <div className="flex flex-col text-center lg:text-left">
                <h1 className="text-[28px] text-gray-800 font-semibold">
                  {item.title}
                </h1>
                <p className="text-base text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessPage;