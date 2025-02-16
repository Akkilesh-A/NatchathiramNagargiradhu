"use client";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

export default function AndromedaChart() {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/andromeda");
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Andromeda data:", error);
      }
    };

    fetchData();
  }, []);

  // Chart Data
  const scatterData = {
    datasets: [
      {
        label: "Andromeda Stars (RA vs DEC)",
        data: data.map((item) => ({
          x: item.ra,
          y: item.dec,
          r: 4, // Dot size
        })),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: { position: "top" },
  //     title: { display: true, text: "Andromeda Galaxy - Gaia Data" },
  //   },
  //   scales: {
  //     x: { title: { display: true, text: "Right Ascension (RA)" } },
  //     y: { title: { display: true, text: "Declination (DEC)" } },
  //   },
  // };

  return (
    <div className="container mx-auto p-4 pt-20 bg-white/50">
      <h1 className="text-2xl font-bold mb-4">Andromeda Visualization</h1>
      {loading ? <p>Loading data...</p> : <Scatter data={scatterData} />}
    </div>
  );
}
