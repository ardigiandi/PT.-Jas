import { Link } from "react-router";
import { Button } from "../../ui/button";

function Hero() {
  return (
    <div className=" max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center mt-0 md:mt-4 gap-8 md:gap-0">
      <div className="flex flex-col gap-6 w-full md:w-[657px] items-start">
        <h1 className="text-[35px] md:text-[55px] font-bold leading-tight">
          Lessons and insights <span className="text-oren">from 8 years</span>
        </h1>
        <p className="text-sm md:text-base dark:text-white text-abu">
          Where to grow your business as a photographer: site or social media?
        </p>
        <Button className="text-sm md:text-base">
          <Link to="/register">Konsultasi</Link>
        </Button>
      </div>
      <img src="/assets/hero.png" alt="" className="w-full md:w-[550px]" />
    </div>
  );
}

export default Hero;
