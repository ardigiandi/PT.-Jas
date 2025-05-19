import React from "react";

const cardList = [
  {
    id: 1,
    title: "Search engine",
    subtitle: "Optimization",
    textColor: 'bg-[#F58220]',
    description: "Learn more",
    desc_image: "/assets/arrow.svg",
    image: "/assets/service1.svg",
    bgColor: "bg-[#F3F3F3]",
  },
  {
    id: 2,
    title: "Search engine",
    subtitle: "Optimization",
    textColor: 'bg-[#FFFFFF] dark:text-black',
    description: "Learn more",
    desc_image: "/assets/arrow.svg",
    image: "/assets/service1.svg",
    bgColor: "bg-[#F58220]",
  },
  {
    id: 3,
    title: "Search engine",
    subtitle: "Optimization",
    textColor: 'bg-[#FFFFFF] dark:text-black',
    description: "Learn more",
    desc_image: "/assets/arrow.svg",
    image: "/assets/service1.svg",
    bgColor: "bg-[#F58220]",
  },
  {
    id: 4,
    title: "Search engine",
    subtitle: "Optimization",
    textColor: 'bg-[#F58220]',
    description: "Learn more",
    desc_image: "/assets/arrow.svg",
    image: "/assets/service1.svg",
    bgColor: "bg-[#F3F3F3]",
  },
];

function ContentPage() {
  return (
    <div className="max-w-6xl mx-auto my-[120px] flex flex-col gap-[85px] px-5 lg:px-0">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        <h1 className="text-3xl font-medium bg-oren w-fit px-2 py-1">
          Services
        </h1>
        <p className="text-base w-full lg:w-[580px] font-normal text-center lg:text-left">
          At our digital marketing agency, we offer a range of services to help
          businesses grow and succeed online. These services include:
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {cardList.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row gap-12 p-[50px] rounded-4xl border border-black shadow-service ${card.bgColor}`}
          >
            <div className="flex flex-col justify-between gap-6 lg:gap-0">
              <div>
                <h1 className={`text-2xl font-medium p-1 w-fit rounded-sm ${card.textColor}`}>
                  {card.title}
                </h1>
                <h1 className={`text-2xl font-medium p-1 w-fit rounded-sm ${card.textColor}`} >
                  {card.subtitle}
                </h1>
              </div>
              <div className="flex gap-4 items-center">
                <img src={card.desc_image} alt="" />
                <h1 className="text-lg font-medium">{card.description}</h1>
              </div>
            </div>
            <img src={card.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentPage;
