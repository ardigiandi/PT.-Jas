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
          <div key={index} className="bg-oren w-[550px] p-5 flex flex-col rounded-md gap-5">
            <img src={card.image} alt="" />
            <h2 className="text-xl font-bold text-white">
              {card.title}
            </h2>
            <p className="text-base text-white">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardPortofolio;
