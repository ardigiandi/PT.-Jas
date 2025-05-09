import React from "react";

const cards = [
  {
    image: "/assets/Icon1.svg",
    title: "2,245,341",
    description: "Members",
  },
  {
    image: "/assets/Icon2.svg",
    title: "46,328",
    description: "Clubs",
  },
  {
    image: "/assets/Icon3.svg",
    title: "1,234",
    description: "Events",
  },
  {
    image: "/assets/Icon4.svg",
    title: "1,234",
    description: "Events",
  },
];

function BusinessPage() {
  return (
    <div className="bg-bg-abu h-full mt-[150px] px-8 lg:px-[100px] py-[84px]">
      <div className="flex flex-col lg:flex-row gap-7 lg:gap-0 items-center justify-between">
        <div className="flex flex-col gap-2 w-full lg:w-[430px]">
          <h1 className="text-4xl font-bold">
            Helping a local{" "}
            <span className="text-oren"> businesss reinvent itself</span>
          </h1>
          <p className="text-base text-gray-600">
            We reached here with our hard work and dedication
          </p>
        </div>
        <div className="flex flex-wrap gap-10 w-full lg:w-[400px] h-full lg:h-[200px] justify-center lg:justify-between">
          {cards.map((item, index) => (
            <div key={index} className="flex gap-3">
              <img src={item.image} alt="" className="w-[48px]" />
              <div className="flex flex-col">
                <h1 className="text-[28px] text-gray-600 font-semibold">
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
