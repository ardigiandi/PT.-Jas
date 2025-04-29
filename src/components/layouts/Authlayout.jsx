import React from "react";
import { Link } from "react-router-dom";

function Authlayout(props) {
  const { children, type, title, description, image, className } = props;

  return (
    <section className="flex flex-col md:flex-row justify-between h-screen p-8 gap-4 md:gap-0">
      <div className="flex flex-col px-0 md:px-[70px] w-full md:w-1/2 gap-5 justify-center order-2 md:order-1">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-4 text-sm">{description}</p>
        {children}

        <p className="text-center mt-14 text-sm">
          {type === "login"
            ? "Don't you have an account? "
            : "Already have an account! "}

          {type === "login" && (
            <Link to="/register" className="text-blue-700 font-semibold">
              Sign Up
            </Link>
          )}

          {type === "register" && (
            <Link to="/login" className="text-blue-700 font-semibold">
              Login
            </Link>
          )}
        </p>
      </div>
      <img src={image} alt="" className={className} />
    </section>
  );
}

export default Authlayout;
