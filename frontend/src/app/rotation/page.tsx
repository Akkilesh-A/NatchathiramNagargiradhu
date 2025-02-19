"use client";

import { DetailedAndromedaMovement } from '@/components'
import React from 'react'
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LIGHT_YEARS = 2.5; // Initial distance (million light-years)
const V = 110; // Velocity (km/s)
const C = 299792; // Speed of light (km/s)

// Relativistic velocity correction
const gamma = Math.sqrt(1 - (V / C) ** 2);
const V_REL = V / gamma; // Corrected velocity
const VELOCITY = V_REL * 3.24078e-14; // Convert to million light-years/year

const AndromedaPath = () => {
  const [data, setData] = useState<{ time: number; distance: number; redshift: number }[]>([]);

  useEffect(() => {
    let year = 0;
    const interval = setInterval(() => {
      year += 100000; // Increment by 100,000 years
      const newDistance = Math.max(LIGHT_YEARS - VELOCITY * year, 0);

      // Calculate redshift dynamically
      const z = Math.sqrt((1 - V / C) / (1 + V / C)) - 1;

      setData((prev) => [...prev, { time: year, distance: newDistance, redshift: z }]);
      if (newDistance <= 0) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-gray-900 p-8 space-y-8">
      <h2 className="text-white text-xl mb-2">Andromeda&lsquo;s Approach to Earth (With Redshift)</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <XAxis dataKey="time" stroke="white" tickFormatter={(t) => `${t / 1e6}M`} />
          <YAxis stroke="white" label={{ value: "Distance (MLY)", angle: -90, position: "insideLeft", fill: "white" }} />
          <Tooltip />
          <Line type="monotone" dataKey="distance" stroke="#82ca9d" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-gray-400 mt-2">Current Redshift: <span className="text-blue-400">{data.length ? data[data.length - 1].redshift.toFixed(6) : "Calculating..."}</span></p>
    </div>
  );
};


const Rotation = () => {
  return (
    <div className='space-y-4'>
        <DetailedAndromedaMovement />
        <AndromedaPath />
    </div>
  )
}

export default Rotation