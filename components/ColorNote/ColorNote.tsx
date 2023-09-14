"use client"

import React from 'react';
import ColorItem from '../ColorItem/ColorItem';

interface ColorNoteProps {
  setCurrentColor: any
  setColor: any
  setTitleTextColor: any
  hexToRgba: any
  setHasChanged: (hasChanged: boolean) => void;
}

const ColorNote: React.FC<ColorNoteProps> = ({setCurrentColor, setColor, setTitleTextColor, hexToRgba, setHasChanged }) => {

  const colors: string[] = ['#FF7D7DDE', '#FFBC7DDE', '#FAE28C', '#D3EF82', '#A5EF82', '#82EFBB', '#82C8EF']

  const handleColorClick = (clickedColor: string) => {
    // console.log('color da chon', clickedColor)
    setCurrentColor(clickedColor);
    const rgbaColor = hexToRgba(clickedColor);
    if (rgbaColor) {
      // console.log('color hex', rgbaColor)
      setColor(rgbaColor);
      // setHasChanged(true)
    } else {
      console.error('Invalid HEX color:', clickedColor);
    }
    if (clickedColor === '#696969') {
      setTitleTextColor('text-white');
    } else {
      setTitleTextColor('text-[#000000]');
    }
  };

  return (
    <div className='flex items-center gap-[20px] w-full justify-between
              xl:flex xl:gap-[30px] xl:items-center xl:sticky  
              '>
      {
        colors?.map((color: string, index: number) => (
          <ColorItem
            key={index}
            color={color}
            onClick={handleColorClick}
          />
        ))
      }
    </div>
  );
};

export default ColorNote;
