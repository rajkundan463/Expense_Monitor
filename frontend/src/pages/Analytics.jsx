import { useEffect, useState } from "react";
import api from "../api/axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/expenses").then(res => setData(res.data.data || []));
  }, []);

  const chartData = {
    labels: data.map(e => e.category),
    datasets: [
      {
        label: "Expense (₹)",
        data: data.map(e => e.amount / 100),
        borderRadius: 12,
        backgroundColor: "rgba(0, 198, 255, 0.8)",
        hoverBackgroundColor: "rgba(0, 114, 255, 1)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#cccccc" },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      y: {
        ticks: { color: "#cccccc" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>

      <div className="analytics-card glass-3d">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
