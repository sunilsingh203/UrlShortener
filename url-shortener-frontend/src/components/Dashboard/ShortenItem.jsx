import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, "");
  const fullShortUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`;

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) setSelectedUrl(shortUrl);
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2025-01-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl("");
    } catch (error) {
      navigate("/error");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) fetchMyShortUrl();
  }, [selectedUrl]);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="bg-zinc-800 border border-zinc-600 rounded-xl shadow-lg shadow-zinc-900 p-6 mb-6 transition-all duration-200 hover:shadow-xl">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={`/s/${shortUrl}`}
              target="_blank"
              className="text-blue-400 font-semibold text-[17px] truncate hover:underline"
            >
              {subDomain + "/s/" + shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-blue-400 text-sm" />
          </div>
          <div className="text-zinc-300 text-[15px] break-words">
            {originalUrl}
          </div>

          <div className="flex gap-6 mt-4 flex-wrap text-zinc-400">
            <div className="flex items-center gap-1 text-green-400 font-semibold">
              <MdOutlineAdsClick className="text-[22px]" />
              <span>{clickCount}</span>
              <span>{clickCount === 1 ? "Click" : "Clicks"}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-semibold">
              <FaRegCalendarAlt />
              <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
            </div>
          </div>
        </div>

        {/* Buttons always side by side */}
        <div className="flex gap-3 mt-4 sm:mt-0 p-6">
          <CopyToClipboard text={fullShortUrl} onCopy={() => setIsCopied(true)}>
            <button className={`flex items-center gap-2 px-4  rounded-md font-semibold transition 
              shadow-md hover:brightness-110 ${isCopied ? "bg-green-600" : "bg-blue-600"} text-zinc-100`}>
              {isCopied ? "Copied" : "Copy"}
              {isCopied ? <LiaCheckSolid /> : <IoCopy />}
            </button>
          </CopyToClipboard>

          <button
            onClick={() => analyticsHandler(shortUrl)}
            className="flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold px-4  rounded-md shadow-md transition"
          >
            Analytics <MdAnalytics />
          </button>
        </div>
      </div>

      {/* Analytics Graph */}
      <div className={`${analyticToggle ? "mt-6" : "hidden"} border-t border-zinc-600 pt-6`}>
        {loader ? (
          <div className="flex justify-center items-center min-h-[150px]">
            <div className="flex flex-col items-center gap-2">
              <Hourglass
                visible={true}
                height="50"
                width="50"
                ariaLabel="hourglass-loading"
                colors={["#3b82f6", "#60a5fa"]}
              />
              <p className="text-zinc-400">Please wait...</p>
            </div>
          </div>
        ) : analyticsData.length === 0 ? (
          <div className="text-center text-zinc-400">
            <h2 className="text-zinc-100 font-bold text-lg">No Data For This Period</h2>
            <p className="text-sm mt-1">Share your short link to see engagements here.</p>
          </div>
        ) : (
          <Graph graphData={analyticsData} />
        )}
      </div>
    </div>
  );
};

export default ShortenItem;
