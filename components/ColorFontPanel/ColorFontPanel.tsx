import React, { FC, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import ColorNote from '../ColorNote/ColorNote'
import FontNote from '../FontNote/FontNote'

interface ColorFontPanelProps {
  setCurrentColor: (currentColor: string) => void;
  setColor: (Color: any) => void;
  setTitleTextColor: (TitleTextColor: any) => void;
  hexToRgba: (hexToRgba: any) => void;
  setHasChanged: (hasChanged: any) => void;
  isVisible: boolean
  setIsVisible: (hasChanged: any) => void;

}

const ColorFontPanel: FC<ColorFontPanelProps> = ({
  setCurrentColor,
  setColor,
  setTitleTextColor,
  hexToRgba,
  setHasChanged,
  isVisible,
  setIsVisible
}) => {
  const handleClickClose = () => {
    setIsVisible(!isVisible);
  }
  return (
    <>
      {isVisible && (
        <div className=' flex flex-col justify-start items-center w-full py-[10px] bg-[#D9D9D9] rounded-[30px] px-[20px] mt-[10px]
          xl:hidden'>
          <div className='self-end w-[12px] h-[12px] cursor-pointer'
            onClick={handleClickClose}
          >
            <IoCloseOutline />
          </div>
          <div className='w-full flex flex-col gap-[7px]'>
            <p>Color</p>
            <ColorNote
              setCurrentColor={setCurrentColor}
              setColor={setColor}
              setTitleTextColor={setTitleTextColor}
              hexToRgba={hexToRgba}
              setHasChanged={setHasChanged}
            />
          </div>
          <div className='w-full flex flex-col gap-[7px]'>
            <p>Font</p>
            <FontNote
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ColorFontPanel