'use client'

import React from 'react'
import { useEffect, useState } from 'react'

const BackgroundVideo = () => {
    const [video,setVideo] = useState(1)
    useEffect(() => {
        const interval = setInterval(() => {
            // setVideo((prevVideo) => (prevVideo === 3 ? 4: prevVideo===2 ? 3 : prevVideo==1 ? 2 : 1));
            setVideo((prevVideo) => {
                if (prevVideo === 1) return 2;
                // if (prevVideo === 2) return 3;
                // if (prevVideo === 3) return 4;  
                return 1; // Reset to 1 after reaching 4
            })
        }, 3000);

        return () => clearInterval(interval);
    }, []);
  return (
    <div className='top-0 left-0 h-[100vh] max-w-[100vw] -z-1 overflow-hidden'>
        <video autoPlay muted loop className={` ${video === 1 ? "block" : "hidden"}`}>
            <source src={`/1.mp4`} type="video/mp4"/>
        </video>
        <video autoPlay muted loop className={` ${video ===2 ? "block" : "hidden"}`}>
            <source src={`/2.mp4`} type="video/mp4"/>
        </video>
        {/* <video autoPlay muted loop className={` ${video === 3 ? "block" : "hidden"}`}>
            <source src={`/3.mp4`} type="video/mp4"/>
        </video>
        <video autoPlay muted loop className={` ${video === 4 ? "block" : "hidden"}`}>
            <source src={`/4.mp4`} type="video/mp4"/>
        </video> */}
    </div>
  )
}

export default BackgroundVideo