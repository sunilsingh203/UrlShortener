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
  const labels = graphData?.map((item) => `${item.clickDate}`);
  const userPerDay = graphData?.map((item) => item.count);

  const data = {
    labels: graphData.length > 0 ? labels : ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data: graphData.length > 0 ? userPerDay : [1, 3, 2, 5, 4, 6, 3],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);

          if (graphData.length > 0) {
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
          color: "#374151",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "#f9fafb",
        titleColor: "#111827",
        bodyColor: "#1f2937",
        borderColor: "#3b82f6",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          color: "#6b7280",
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: "#1f2937",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
        },
        title: {
          display: true,
          text: "Date",
          color: "#1f2937",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return <Bar className="w-full" data={data} options={options} />;
};

export default Graph;
