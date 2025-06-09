import React from "react";
import HeroSection from "@/components/layouts/HeroLayouts";
import ClientLayout from "@/components/layouts/ClientLayouts";
import TentangLayouts from "@/components/layouts/TentangLayouts";
import VisiMisiLayouts from "@/components/layouts/VisiMisiLayouts";
import ServiceView from "@/components/layouts/ServicesLayout";
import CardPortofolio from "@/components/layouts/PortofolioLayouts";
import Footer from "@/components/fragments/footer/footer";
import Cta from "@/components/fragments/cta/cta";
// import DesktopNavbar from "@/components/DesktopNavbar";

function HomePage() {
  return (
    <div>
      {/* <DesktopNavbar /> */}
      <section>
        <div id="hero">
          <HeroSection />
        </div>
        <div id="clients">
          <ClientLayout />
        </div>
        <div id="about">
          <TentangLayouts />
        </div>
        <div id="vision">
          <VisiMisiLayouts />
        </div>
        <div id="services">
          <ServiceView />
        </div>
        <div id="cta">
          <Cta />
        </div>
        <div id="portofolio">
          <CardPortofolio />
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
