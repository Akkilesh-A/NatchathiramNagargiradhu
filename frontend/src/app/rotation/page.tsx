// "use client"

// import type React from "react"
// import { motion } from "framer-motion"

// const AndromedaMovement: React.FC = () => {
//   return (
//     <div className="w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden relative">
//       {/* Stars */}
//       {[...Array(50)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-1 h-1 bg-white rounded-full"
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             opacity: Math.random(),
//           }}
//         />
//       ))}

//       {/* Earth */}
//       <motion.svg
//         width="100"
//         height="100"
//         viewBox="0 0 100 100"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//         className="absolute"
//       >
//         <circle cx="50" cy="50" r="48" fill="#4B6CB7" />
//         <path d="M50 0 C50 50 100 50 50 100 C50 50 0 50 50 0" fill="#1E3A8A" opacity="0.3" />
//       </motion.svg>

//       {/* Andromeda Galaxy */}
//       <motion.svg
//         width="200"
//         height="200"
//         viewBox="0 0 200 200"
//         animate={{
//           rotate: 360,
//           x: [0, 100, 0],
//           y: [0, -50, 0],
//         }}
//         transition={{
//           duration: 30,
//           repeat: Number.POSITIVE_INFINITY,
//           ease: "linear",
//         }}
//         className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
//       >
//         <ellipse cx="100" cy="100" rx="80" ry="40" fill="url(#galaxy-gradient)" />
//         <defs>
//           <radialGradient id="galaxy-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
//             <stop offset="0%" stopColor="#FFD700" />
//             <stop offset="20%" stopColor="#FFA500" />
//             <stop offset="40%" stopColor="#FF4500" />
//             <stop offset="60%" stopColor="#8B0000" />
//             <stop offset="80%" stopColor="#800080" />
//             <stop offset="100%" stopColor="#4B0082" />
//           </radialGradient>
//         </defs>
//       </motion.svg>

//       {/* Information Text */}
//       <div className="absolute bottom-4 left-4 text-white text-sm">
//         <p>Andromeda Galaxy is approaching the Milky Way at about 110 km/s (68 mi/s).</p>
//         <p>The galaxies are expected to collide in about 4.5 billion years.</p>
//       </div>
//     </div>
//   )
// }

// export default AndromedaMovement

import { DetailedAndromedaMovement } from '@/components'
import React from 'react'

const Rotation = () => {
  return (
    <div>
        <DetailedAndromedaMovement />
    </div>
  )
}

export default Rotation