import React from "react";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-custom-gradient text-white py-8 z-40 relative">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">Shrinkify</h2>
          <p>Simplifying URL shortening for efficient sharing</p>
        </div>

        <p className="mt-4 lg:mt-0">
          &copy; 2025 Shrinkify. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 lg:mt-0">
          <a
            href="https://github.com/sunilsingh203"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="mailto:sunilsingh81188@gmail.com"
            className="hover:text-gray-200"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/sunil-singh-326992363/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
