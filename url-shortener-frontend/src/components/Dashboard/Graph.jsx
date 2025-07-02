import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const safeData = graphData || [];

  const labels = safeData.map((item) => `${item.clickDate}`);
  const userPerDay = safeData.map((item) => item.count);

  const data = {
    labels: safeData.length > 0 ? labels : ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data: safeData.length > 0 ? userPerDay : [1, 3, 2, 5, 4, 6, 3],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          if (safeData.length > 0) {
            gradient.addColorStop(0, "#3b82f6");
            gradient.addColorStop(1, "#60a5fa");
          } else {
            gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
            gradient.addColorStop(1, "rgba(96, 165, 250, 0.2)");
          }
          return gradient;
        },
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#e5e7eb",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f9fafb",
        bodyColor: "#e5e7eb",
        borderColor: "#3b82f6",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.1)" },
        ticks: {
          color: "#d1d5db",
          callback: function (value) {
            return Number.isInteger(value) ? value.toString() : "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: "#e5e7eb",
          font: { size: 16, weight: "bold" },
        },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#d1d5db" },
        title: {
          display: true,
          text: "Date",
          color: "#e5e7eb",
          font: { size: 16, weight: "bold" },
        },
      },
    },
    animation: { duration: 1000, easing: "easeOutQuart" },
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-2xl shadow w-full">
      <div className="h-80 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
