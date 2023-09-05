"use client"

import React from 'react'
import ColorItem from './ColorItem'
import { useState, useCallback } from 'react'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
const NewNote = () => {
  const colors: string[] = ['#FEF5CB', '#E0FCDB', '#FFDDED', '#E1CAFA', '#D8ECFF', '#E8E8E8', '#696969']
  const [currentColor, setCurrentColor] = useState('#FEF5CB')
  const wrapperRef = useCallback((wrapper) => {

    if (wrapper === null) return
    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    new Quill('#container', { theme: 'snow'})

    return () => {
      wrapperRef.innerHTML = ''
    }
  }, [])
  // const wrapperRef = useCallback((wrapper) => {
  //   if (wrapper === null) return
  // })
  return (
    <div className='flex justify-center'>
      <div className='absolute max-w-[1368px] min-w-[1000px]' style={{ backgroundColor: currentColor }}>
        <div className='pt-6 px-[68px] '>
          <div className='flex justify-center'>
            <h2 className='text-2xl font-semibold text-[#000000]'>Create Note</h2>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold text-[#000000]'>Title</h2>
            <div className=''>
              <input type="text" placeholder='Title...' />
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold text-[#000000]'>Contents</h2>
            <div id='container' ref={wrapperRef}></div>
          </div>
        </div>
        <div className='flex justify-between pl-[44px] pr-[54px] pt-[33px] pb-[66px]'>
          <div className='flex gap-[30px]'>
            {
              colors?.map((color: string, index: number) => (
                <ColorItem
                  key={index}
                  color={color}
                  onClick={(clickedColor: string) => {
                    // console.log(`Clicked color: ${clickedColor}`);
                    setCurrentColor(clickedColor)
                  }}
                />
              ))
            }
          </div>
          <div>
            <button className='w-[114px] h-[50px] bg-[#FFFFFF] text-[24px] font-semibold rounded-[30px]'>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewNote