import React from "react";
import HeroSection from "@/components/layouts/HeroLayouts";
import ClientLayout from "@/components/layouts/ClientLayouts";
import TentangLayouts from "@/components/layouts/TentangViews";
import VisiMisiLayouts from "@/components/layouts/VisiMisiLayouts";
import ServiceView from "@/components/layouts/ServicesLayout";
import CardPortofolio from "@/components/fragments/portofolio/content";
import Footer from "@/components/fragments/footer/footer";
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
        <div id="portofolio">
          <CardPortofolio />
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;
