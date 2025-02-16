'use client'

import { Globe } from '@/components/magicui'
import { Button, Card, CardContent, CardFooter, CardHeader, Input } from '@/components/ui'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PredictionPage = () => {
    const [ra, setRa] = useState('')
    const [dec, setDec] = useState('')
    const [isZPredicted, setIsZPredicted] = useState(false)

    const handleSubmit = () => {
        setIsZPredicted((val)=>!val)
        console.log(ra, dec)
    }

    return (
        <div className='relative noise-bg-1 h-screen space-y-40 overflow-y-hidden'>
            <motion.div 
                initial={{ x: 0 }}
                animate={{ x: isZPredicted ? '-30%' : '0%' }}
                transition={{ duration: 0.5 }}
                className={`flex justify-center z-[100] items-center pt-48`}
            >
                <Card className='w-[30%]'>
                    <CardHeader className='font-bold text-xl'>Feed your inputs here!</CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>RA - Right Ascension</label>
                                <Input onChange={(e) => setRa(e.target.value)} type='text' className='font-mono' placeholder='Enter RA here' />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>DEC - Declination</label>
                                <Input onChange={(e) => setDec(e.target.value)} type='text' className='font-mono' placeholder='Enter DEC here' />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </CardFooter>
                </Card>
            </motion.div>
            {isZPredicted &&
                <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ translateY: isZPredicted ? 0 : 60 }}
                    transition={{ duration: 0.5 }}
                    className={`flex overflow-hidden z-0 rounded-lg fixed top-48 left-96 right-0 bottom-0 scale-50`}
                    >
                    <Globe />
                </motion.div>
            }
            {!isZPredicted &&
            <motion.div 
                initial={{ scale: 1 }}
                animate={{ translateY: isZPredicted ? 0 : 60 }}
                transition={{ duration: 0.5 }}
                className={`relative flex overflow-hidden rounded-lg px-40 pt-24 pb-40 `}
                >
                <Globe />
            </motion.div>
            }
        </div>
    )
}

export default PredictionPage
