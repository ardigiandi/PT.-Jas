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
            Kami siap membantu Anda. Klik tombol di bawah untuk langsung
            terhubung melalui WhatsApp.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://wa.me/6287887772919"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-center hover:bg-green-600 text-white px-6 py-3 rounded-full text-base font-medium shadow-md transition-all duration-300"
            >
              Admin 1 <br /> (Pak Husni)
            </a>
            <a
              href="https://wa.me/6285762193485"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-center hover:bg-green-600 text-white px-6 py-3 rounded-full text-base font-medium shadow-md transition-all duration-300"
            >
              Admin 2 <br /> (Pak Widdy)
            </a>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7244283487744!2d106.92679847399081!3d-6.299895493689233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992a6b6dc0839%3A0x58d471187b55747e!2sJl.%20Pasar%20Kecapi%20No.9%2C%20RT.009%2FRW.016%2C%20Jatirahayu%2C%20Kec.%20Pd.%20Melati%2C%20Kota%20Bks%2C%20Jawa%20Barat%2017414!5e0!3m2!1sid!2sid!4v1750405412474!5m2!1sid!2sid"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default Cta;
