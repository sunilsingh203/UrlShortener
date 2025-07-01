import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2 bg-zinc-800">
      <div className="w-full sm:py-10 py-8">
        {/* Heading */}
        <h1 className="sm:text-4xl text-zinc-100 text-3xl font-bold italic mb-3">
          About Shrinkify
        </h1>

        {/* Intro Paragraph */}
        <p className="text-zinc-300 text-sm mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full whitespace-normal break-words">
          Shrinkify simplifies URL shortening for efficient sharing. You can easily generate, manage, and track your shortened links using our intuitive and reliable platform.
        </p>

        {/* Features Section */}
        <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full">
          {/* Feature 1 */}
          <div className="flex items-start">
            <FaLink className="text-blue-400 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-zinc-100">
                Simple URL Shortening
              </h2>
              <p className="text-zinc-400">
                Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start">
            <FaShareAlt className="text-green-400 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-zinc-100">
                Powerful Analytics
              </h2>
              <p className="text-zinc-400">
                Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start">
            <FaEdit className="text-purple-400 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-zinc-100">
                Enhanced Security
              </h2>
              <p className="text-zinc-400">
                Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start">
            <FaChartLine className="text-red-400 text-3xl mr-4" />
            <div>
              <h2 className="sm:text-2xl font-bold text-zinc-100">
                Fast and Reliable
              </h2>
              <p className="text-zinc-400">
                Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
