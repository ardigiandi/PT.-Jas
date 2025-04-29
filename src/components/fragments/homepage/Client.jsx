import React from "react";

function Client() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-0 mt-[100px]">
      <h1 className="text-[28px] font-semibold text-center">Our Clients</h1>
      <p className="text-base text-gray-500 text-center">
        We have been working with some Fortune 500+ clients
      </p>
      <div className="flex flex-wrap justify-center gap-9 md:gap-0 md:justify-between mt-9 px-0 md:px-14">
        <img src="/assets/client.svg" alt="" />
        <img src="/assets/client2.svg" alt="" />
        <img src="/assets/client3.svg" alt="" />
        <img src="/assets/client4.svg" alt="" />
        <img src="/assets/client5.svg" alt="" />
        <img src="/assets/client6.svg" alt="" />
        <img src="/assets/client7.svg" alt="" />
      </div>
    </section>
  );
}

export default Client;
