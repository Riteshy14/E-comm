import Footer from "../component/Footer";
import { TopBar } from "../component/TopBar";
import {FaPhone,FaEnvelope,FaMapMarkerAlt,FaFacebook,FaTwitter,FaInstagram} from "react-icons/fa";

export function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar icon={"search_icon.png"} />

<section
  className="w-full h-64 md:h-80 flex items-center justify-center bg-cover bg-center relative"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')`,
  }}
>
  <div className="absolute inset-0 bg-black/40"></div> 
  <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center px-4">
    Contact Us
  </h1>
</section>


      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p>123 E-comm Street, Mumbai, India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <FaPhone className="text-green-600 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p>+91 xxxxxxxxxx</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <FaEnvelope className="text-red-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p>contact@e-comm.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex gap-4 text-blue-600 text-xl">
              <FaFacebook className="hover:text-blue-800 cursor-pointer transition" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer transition" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Follow Us</h3>
              <p>Social Media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map (Mumbai) */}
      <section className="w-full h-64 md:h-96 mb-12">
        <iframe
          title="E-comm Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.116158225511!2d72.82581327493323!3d19.082197387065523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c63f3ee9f22d%3A0x19c1c5c0c5fef9e3!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
}
