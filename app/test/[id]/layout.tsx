'use client'
import React from 'react'

const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
    const handleOnchange = (e:React.ChangeEvent<HTMLInputElement>) => {

    }
  return (
    <div>header con
        {children}
        <input type="text" onChange={e => handleOnchange(e)} />
    </div>
  )
}

export default layout;