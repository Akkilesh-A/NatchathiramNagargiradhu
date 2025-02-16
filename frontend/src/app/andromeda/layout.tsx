import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='noise-bg-1 h-screen'>{children}</div>
  )
}

export default layout