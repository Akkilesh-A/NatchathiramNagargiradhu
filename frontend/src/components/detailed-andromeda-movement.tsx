"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const DetailedAndromedaMovement: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(4.5 * 1000 * 365 * 24 * 60 * 60) // 4.5 billion years in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000000) // Decrease by 1 million seconds (about 11.5 days) every second for visual effect
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => {
    const years = Math.floor(time / (365 * 24 * 60 * 60))
    const days = Math.floor((time % (365 * 24 * 60 * 60)) / (24 * 60 * 60))
    return `${years.toLocaleString()} years, ${days} days`
  }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Stars */}
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random(),
            animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
          }}
        />
      ))}

      {/* Milky Way Boundary */}
      <motion.svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        className="absolute opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <path
          d="M400 50 C550 150 650 300 700 400 C650 500 550 650 400 750 C250 650 150 500 100 400 C150 300 250 150 400 50"
          fill="none"
          stroke="url(#milkyway-gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="milkyway-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B0082" />
            <stop offset="25%" stopColor="#0000FF" />
            <stop offset="50%" stopColor="#00FFFF" />
            <stop offset="75%" stopColor="#FF00FF" />
            <stop offset="100%" stopColor="#FF0000" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Earth */}
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute"
      >
        <circle cx="50" cy="50" r="48" fill="#1E3A8A" /> {/* Oceans */}
        <path d="M30 20 Q40 10 50 15 T70 25 Q80 35 75 50 T65 70 Q55 80 40 75 T25 60 Q20 45 30 20" fill="#4ADE80" />{" "}
        {/* Continents */}
        <path d="M70 75 Q80 65 85 80 T75 90 Q65 95 70 75" fill="#4ADE80" /> {/* Australia */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="#60A5FA" strokeWidth="1" /> {/* Atmosphere */}
      </motion.svg>

      {/* Andromeda Galaxy */}
      <motion.svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        animate={{
          rotate: 360,
          x: [0, 150, 0],
          y: [0, -75, 0],
        }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <defs>
          <radialGradient id="andromeda-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="20%" stopColor="#FFA500" />
            <stop offset="40%" stopColor="#FF4500" />
            <stop offset="60%" stopColor="#8B0000" />
            <stop offset="80%" stopColor="#800080" />
            <stop offset="100%" stopColor="#4B0082" />
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="150" rx="120" ry="60" fill="url(#andromeda-gradient)" />
        <path
          d="M150 90 C200 110 240 140 270 150 C240 160 200 190 150 210 C100 190 60 160 30 150 C60 140 100 110 150 90"
          fill="none"
          stroke="#FFD700"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M150 90 C180 120 210 140 240 150 C210 160 180 180 150 210 C120 180 90 160 60 150 C90 140 120 120 150 90"
          fill="none"
          stroke="#FFA500"
          strokeWidth="2"
          opacity="0.5"
        />
      </motion.svg>

      {/* Doomsday Timer */}
      <div className="absolute top-4 left-4 text-white text-sm">
        <p className="text-lg font-bold">Time until collision:</p>
        <p className="text-xl">{formatTime(timeLeft)}</p>
      </div>

      {/* Information Text */}
      <div className="absolute bottom-4 left-4 text-white text-sm">
        <p>Andromeda Galaxy is approaching the Milky Way at about 110 km/s (68 mi/s).</p>
        <p>The galaxies are expected to collide in about 4.5 billion years.</p>
      </div>
    </div>
  )
}

export default DetailedAndromedaMovement