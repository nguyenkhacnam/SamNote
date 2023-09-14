import React, { FC } from 'react'
import FontItem from '../FontItem/FontItem'

interface FontNoteProps {}

const FontNote: FC<FontNoteProps> = () => {
  const fontNote: string [] = ['Poppins', 'Arial', 'Apple', 'Poppins']
  return (
    <div className='flex w-full justify-between gap-1'>
      {
        fontNote.map((font, index) => (
          <FontItem 
            key={index}
            font={font}
          />
        ))
      }
    </div>
  )
}

export default FontNote