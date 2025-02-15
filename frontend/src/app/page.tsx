'use client'

import BackgroundVideo from '@/components/background-video'
import React from 'react'
import Lenis from "lenis"
import { useEffect } from 'react'
import { Button, H1, GoogleGeminiEffect, WobbleCard } from '@/components/ui'
import { useScroll, useTransform } from "framer-motion";

const Home = () => {
  useEffect(()=>{
    const lenis=new Lenis()
    // @ts-expect-error - TODO: Fix this
    function raf(time){
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  },[])

  return (
    <div>
      <div className='relative'>
        <BackgroundVideo />
        <div className='absolute top-10 z-10 text-white flex flex-col justify-center w-full h-full space-y-4'>
          <H1 className='text-center'>
            Travel through the spectrum of Space and Time
          </H1>
          <div className='flex font-mono space-x-4 justify-center w-full items-center text-xl'>
            <Button variant="secondary" className='rounded-full p-4 py-6 '>
              Get Started
            </Button>
            <Button variant="ghost" className='rounded-full p-4 py-6 hover:bg-transparent hover:text-white'>
              About Us
            </Button>
          </div>
        </div>
      </div>
      <div className='bg-white py-16 text-black flex flex-col space-y-4 justify-center items-center'>
        <H1>What we do</H1>
        <WobbleCardSection />
      </div>
      <div>
        <GoogleGeminiEffectDemo />
      </div>
    </div>
  )
}

function WobbleCardSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-purple-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Predicting Andromeda’s Motion Using Doppler Shift
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Analyzing light frequency shifts from nearby galaxies to estimate Andromeda’s velocity and future trajectory.
          </p>
        </div>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Unlocking the Secrets of Cosmic Motion
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          By leveraging the Doppler effect, we can detect the redshift and blueshift of celestial objects, revealing their motion relative to Earth.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Build AI Models for Predicting Galactic Motion
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Use signal processing and machine learning to analyze Doppler-shifted light, estimate redshift values, and predict Andromeda’s future movement.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}

function GoogleGeminiEffectDemo() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

export default Home