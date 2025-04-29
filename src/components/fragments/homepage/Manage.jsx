import React from "react";

function ManagePage() {
  return (
    <div className="mt-[100px] max-w-6xl mx-auto px-4 md:px-0">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[28px] leading-snug text-center w-[490px] font-semibold">
          Manage your entire community in a single system
        </h1>
        <p className="text-base text-gray-500">Who is Nextcent suitable for?</p>
      </div>
      <div className="mt-9 flex flex-wrap justify-between">
        <CardManage
          image="/assets/manage1.svg"
          title="Membership Organisations"
          description="Our membership management software provides full automation of membership renewals and payments"
        />
        <CardManage
          image="/assets/manage2.svg"
          title="National Associations"
          description="Our membership management software  full automation of membership renewals and payments"
        />
        <CardManage
          image="/assets/manage3.svg"
          title="Clubs And Groups"
          description="Our membership management software provides full automation of membership renewals and payments"
        />
      </div>
    </div>
  );
}

const CardManage = ({ image, title, description }) => {
  return (
    <div
      className="flex flex-col gap-4 items-center w-[299px] h-[260px] rounded-md justify-start py-5 bg-white dark:bg-abu
     shadow-soft"
    >
      <img src={image} alt="" className="w-[65px] h-[65px]" />
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      <p className="text-center text-sm">{description}</p>
    </div>
  );
};

export default ManagePage;
