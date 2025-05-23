import Footer from "@/components/fragments/footer/footer";
import CardPortofolio from "@/components/fragments/portofolio/content";
import Hero from "@/components/fragments/portofolio/hero";
import React from "react";

function Portofolio() {
  return(
    <div>
        <Hero/> 
        <CardPortofolio/>
        <Footer />
    </div>
  )
}

export default Portofolio;
