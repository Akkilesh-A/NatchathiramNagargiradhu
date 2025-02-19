"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const SCREEN_WIDTH = 800; // Viewport width
const INITIAL_DISTANCE = 2.537e6 * 9.461e15; // 2.537 million light-years in meters
const RADIAL_SPEED = -358.1 * 1000; // km/s to m/s (negative means approaching)
const TIME_STEP = 1e14; // ~3 million years per step
const SCALE_FACTOR = 1e-19; // Scale for visualization
const FINAL_X = 150; // Stop point (collision)
const SPEED_OF_LIGHT = 299792458; // m/s

export default function GalaxyCollision() {
  const [andromedaX, setAndromedaX] = useState(SCREEN_WIDTH);
  const [distance, setDistance] = useState(INITIAL_DISTANCE);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [redshift, setRedshift] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAndromedaX((prevX) => Math.max(prevX + RADIAL_SPEED * TIME_STEP * SCALE_FACTOR, FINAL_X));
      setDistance((prevDistance) => Math.max(prevDistance + RADIAL_SPEED * TIME_STEP, 0));
      setTimeElapsed((prevTime) => prevTime + TIME_STEP / (1e6 * 365.25 * 24 * 3600)); // Convert to million years

      // Calculate Redshift (z = v/c)
      setRedshift(RADIAL_SPEED / SPEED_OF_LIGHT);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div suppressHydrationWarning className="flex justify-center items-center h-screen bg-black text-white">
      {/* Left Side: Galaxy Animation */}
      <div className="flex-1 flex justify-center">
        <svg width="100%" height="300" viewBox={`0 0 ${SCREEN_WIDTH} 300`}>
          {/* Background Stars */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * SCREEN_WIDTH}
              cy={Math.random() * 300}
              r={Math.random() * 2}
              fill="white"
              opacity="0.5"
            />
          ))}

          {/* Milky Way (Fixed Left) */}
          <circle cx="100" cy="150" r="30" fill="blue" />
          <text x="90" y="180" fill="white" fontSize="14">Milky Way</text>

          {/* Motion Path (Trajectory Line) */}
          <line x1={SCREEN_WIDTH} y1="150" x2="100" y2="150" stroke="gray" strokeDasharray="5,5" opacity="0.6" />

          {/* Andromeda (Moving Galaxy) */}
          <motion.circle
            cx={andromedaX}
            cy="150"
            r="35"
            fill="red"
            transition={{ ease: "linear", duration: 0.1 }}
          />
          <motion.text x={andromedaX - 20} y="180" fill="white" fontSize="14">
            Andromeda
          </motion.text>
        </svg>
      </div>

      {/* Right Side: Real-Time Data Panel */}
      <div className="w-64 p-4 border-l border-gray-600 text-sm">
        <h2 className="text-lg font-bold mb-2">📊 Collision Data</h2>
        <p><strong>Distance:</strong> {(distance / 9.461e15).toFixed(2)} ly</p>
        <p><strong>Velocity:</strong> {RADIAL_SPEED / 1000} km/s</p>
        <p><strong>Time Elapsed:</strong> {timeElapsed.toFixed(2)} million years</p>
        <p><strong>Redshift (z):</strong> {redshift.toExponential(6)}</p>
        <p>
          <strong>Shift Type:</strong> {redshift < 0 ? "Blueshift 🔵 (Approaching)" : "Redshift 🔴 (Receding)"}
        </p>
      </div>
    </div>
  );
}