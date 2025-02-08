import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, ChevronUp } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Subscribed:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Wavy top border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-800"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and mission */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold inline-block">
              <span className="text-green-400">Tech</span>
              <span
                className="mines"
                style={{
                  backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2018/08/25/20/58/wall-3630911_1280.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Savvy
              </span>
            </h2>
            <p className="text-gray-300">
            Connecting surplus food with those in need through innovative technology
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Donor Dashboard", path: "/donorDashboard" },
                { name: "NGO Dashboard", path: "/ngoDashboard" },
                { name: "Admin Dashboard", path: "/admin/adminDashboard" },
                { name: "Login", path: "/login" },
                { name: "Register", path: "/register" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Contact Us
            </h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Eco Street, Green City</p>
              <p>contact@greenmines.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Stay Updated
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tech Savvy. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-300"
          >
            <ChevronUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
}

// export default Footer;
