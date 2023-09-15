import React, { FC } from 'react'

interface FontItemProps { 
  font: string
}

const FontItem: FC<FontItemProps> = ({ font }) => {
  return (
    <>
      <div
        className='xl:w-8 xl:h-8 cursor-pointer bg-[#AAAAAA] px-[10px] py-[2px] rounded-[6px] text-[12px]  max-w-[72px] flex'
      >
        {font}
      </div>
    </>
  )
}

export default FontItem