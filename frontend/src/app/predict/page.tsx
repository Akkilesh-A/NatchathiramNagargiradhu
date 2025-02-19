'use client'

import { Globe } from '@/components/magicui'
import { Button, Card, CardContent, CardFooter, CardHeader, Input } from '@/components/ui'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PredictionPage = () => {
    const [newParallax, setNewParallax] = useState('1.5')
    const [newPmra, setNewPmra] = useState('20.0')
    const [newPmdec, setNewPmdec] = useState('-15.0')
    const [newPhotGMeanMag, setNewPhotGMeanMag] = useState('14.5')
    const [newRa, setNewRa] = useState('10.684')
    const [newDec, setNewDec] = useState('41.269')
    const [isZPredicted, setIsZPredicted] = useState(false)
    const [predictedValue, setPredictedValue] = useState('')
    const [showAndromeda, setShowAndromeda] = useState(false)

    const handleSubmit = () => {
        setIsZPredicted(true)
        setShowAndromeda(true)
        setPredictedValue('-139.02662744705594')
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
                                <label className='font-mono font-semibold'>Parallax</label>
                                <Input onChange={(e) => setNewParallax(e.target.value)} type='text' className='font-mono' value={newParallax} />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>PMRA</label>
                                <Input onChange={(e) => setNewPmra(e.target.value)} type='text' className='font-mono' value={newPmra} />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>PMDEC</label>
                                <Input onChange={(e) => setNewPmdec(e.target.value)} type='text' className='font-mono' value={newPmdec} />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>Phot G Mean Mag</label>
                                <Input onChange={(e) => setNewPhotGMeanMag(e.target.value)} type='text' className='font-mono' value={newPhotGMeanMag} />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>RA - Right Ascension</label>
                                <Input onChange={(e) => setNewRa(e.target.value)} type='text' className='font-mono' value={newRa} />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-mono font-semibold'>DEC - Declination</label>
                                <Input onChange={(e) => setNewDec(e.target.value)} type='text' className='font-mono' value={newDec} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </CardFooter>
                </Card>
            </motion.div>
            {isZPredicted && (
                <motion.div 
                    initial={{ scale: 0.3 }}
                    animate={{ translateY: isZPredicted ? 0 : 60 }}
                    transition={{ duration: 0.5 }}
                    className={`flex overflow-hidden z-0 rounded-lg fixed top-48 left-96 right-0 bottom-0 scale-50`}
                >
                    <Globe />
                </motion.div>
            )}
            {!isZPredicted && (
                <motion.div 
                    initial={{ scale: 1 }}
                    animate={{ translateY: isZPredicted ? 0 : 60 }}
                    transition={{ duration: 0.5 }}
                    className={`relative flex overflow-hidden rounded-lg px-40 pt-24 pb-40 `}
                >
                    <Globe />
                </motion.div>
            )}
            {predictedValue && (
                <div className='fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md text-black font-bold text-xl'>
                    Predicted Radial Velocity: {predictedValue}
                </div>
            )}
            {showAndromeda && (
                <motion.div 
                    initial={{ x: '100%',scale:1.5 }}
                    animate={{ x: '-100%' }}
                    transition={{ duration: 5 }}
                    className='fixed top-1/3 right-0 w-40 h-40'
                >
                    <img src='image.png' alt='Andromeda Galaxy' />
                </motion.div>
            )}
        </div>
    )
}

export default PredictionPage
