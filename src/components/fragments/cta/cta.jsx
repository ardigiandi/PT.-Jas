import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Cta() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* WhatsApp Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 text-center md:text-left">
          <div className="flex items-center justify-center mb-4">
            <FaWhatsapp className="text-green-500 w-16 h-16" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Hubungi Kami via WhatsApp
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Kami siap membantu Anda. Klik tombol di bawah untuk langsung terhubung melalui WhatsApp.
          </p>
          <a
            href="https://wa.me/6285776152059"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition-all duration-300"
          >
            Chat Sekarang
          </a>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Maps No API"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.170444016351!2d106.74194861536052!3d-6.240847562838702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fa99269347c9%3A0x9c14fe2c11a4e8b6!2sUniversitas%20Pamulang!5e0!3m2!1sen!2sid!4v1625061980937!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Cta;
