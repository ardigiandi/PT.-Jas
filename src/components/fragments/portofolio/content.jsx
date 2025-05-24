import React from "react";

const CardList = [
  {
    image: "/assets/porto.jpg",
    title: "Instalasi Wastafel Dapur",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo nisi expedita similique, nobis voluptate voluptates enim natus corporis ipsa dolorum suscipit! Ratione incidunt nisi ea fugiat et ab libero.",
  },
  {
    image: "/assets/porto.jpg",
    title: "Instalasi Wastafel Dapur",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo nisi expedita similique, nobis voluptate voluptates enim natus corporis ipsa dolorum suscipit! Ratione incidunt nisi ea fugiat et ab libero.",
  },
  {
    image: "/assets/porto.jpg",
    title: "Instalasi Wastafel Dapur",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo nisi expedita similique, nobis voluptate voluptates enim natus corporis ipsa dolorum suscipit! Ratione incidunt nisi ea fugiat et ab libero.",
  },
  {
    image: "/assets/porto.jpg",
    title: "Instalasi Wastafel Dapur",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo nisi expedita similique, nobis voluptate voluptates enim natus corporis ipsa dolorum suscipit! Ratione incidunt nisi ea fugiat et ab libero.",
  },
  {
    image: "/assets/porto.jpg",
    title: "Instalasi Wastafel Dapur",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo nisi expedita similique, nobis voluptate voluptates enim natus corporis ipsa dolorum suscipit! Ratione incidunt nisi ea fugiat et ab libero.",
  },
  {
    image: "/assets/porto.jpg",
    title: "Instalasi Wastafel Dapur",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia explicabo nisi expedita similique, nobis voluptate voluptates enim natus corporis ipsa dolorum suscipit! Ratione incidunt nisi ea fugiat et ab libero.",
  },
];

function CardPortofolio() {
  return (
    <div className="max-w-6xl mx-auto my-[100px]">
      <h1 className="flex justify-center text-2xl font-semibold">
        My latest work
      </h1>

      <div className="flex flex-wrap justify-center mt-16 gap-5">
        {CardList.map((card, index) => (
          <div
            key={index}
            className="bg-oren w-[550px] p-5 flex flex-col rounded-md gap-5"
          >
            <img src={card.image} alt="" />
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-white/80">{card.title}</h2>
              <h1 className="text-2xl font-bold text-white">Caffe Tutti</h1>
              <h1 className="text-sm text-white/80 font-medium ">01 Januari 2022</h1>
            </div>
            <p className="text-base text-white/80">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardPortofolio;
