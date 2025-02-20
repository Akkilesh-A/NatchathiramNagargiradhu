import Link from 'next/link'
import React from 'react'

const NavBarLinks=[
    {
        name:'Home',
        href:'/'
    },
    {
        name:'Predict',
        href:'/predict'
    },
    {
        name:'Movement w.r.t Earth 🌍',
        href:'/rotation'
    },
    {
        name:'Andromeda data from Gaia',
        href:'/andromeda'
    },
    {
        name:'Machine Learning',
        href:'/andromeda'
    }
]

const NavBar = ({variant}:{variant?:string}) => {
  return (
    <div className={`absolute font-mono z-40 cursor-pointer top-10 flex justify-center w-full items-center space-x-16 ${variant==='dark'?'text-black0 py-4':'text-white'}`}>
        {NavBarLinks.map((link,index)=>{
            return(
                <Link href={link.href} key={index}>
                    {link.name}
                </Link>
            )
        })}
    </div>
  )
}

export default NavBar