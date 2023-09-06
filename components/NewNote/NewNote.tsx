"use client"

import React from 'react'
import ColorItem from '../ColorItem/ColorItem'
import './NewNote.css'
import { useState, useRef, useEffect } from 'react'

import { IoMdNotificationsOutline } from 'react-icons/io'
import { RiFontSize } from 'react-icons/ri'
import { BsListUl, BsShare, BsArrowDownSquare, BsPin } from 'react-icons/bs'
import { PiImageSquare } from 'react-icons/pi'
import { MdPublic } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'


const NewNote = () => {
  const colors: string[] = ['#FEF5CB', '#E0FCDB', '#FFDDED', '#E1CAFA', '#D8ECFF', '#E8E8E8', '#696969']
  const [currentColor, setCurrentColor] = useState('#FEF5CB')
  const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');

  const handleColorClick = (clickedColor: string) => {
    setCurrentColor(clickedColor);
    if (clickedColor === '#696969') {
      setTitleTextColor('text-white');
    } else {
      setTitleTextColor('text-[#000000]');
    }
  };

  const titleRef = useRef();
  const contentRef = useRef();

  const setupAutoResize = (ref) => {
    const handleKeyUp = (event) => {
      ref.current.style.height = 'auto';
      let scHeight = event.target.scrollHeight;
      ref.current.style.height = `${scHeight}px`;
    };

    if (ref.current) {
      ref.current.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('keyup', handleKeyUp);
      }
    };
  };

  useEffect(() => {
    setupAutoResize(titleRef);
    setupAutoResize(contentRef);
  }, []);
  const inputTitleRef = useRef(null);
  const inputContentRef = useRef(null);
  const handleLabelClick = (ref) => {
    ref.current?.focus();
  };

  return (
    <div className='flex justify-center'>
      <div className=' flex flex-col justify-between min-w-[1368px] max-w-[1000px] min-h-[587px] rounded-[20px]' style={{ backgroundColor: currentColor }}>
        <div className='relative pt-6 px-[68px] '>
          <div className='absolute right-[68px] w-[35px] h-[35px] bg-white flex justify-center items-center rounded-full'>
            <BsPin className='text-[28px] cursor-pointer' />
          </div>
          <div className='flex justify-center'>
            <h2 className={`text-2xl font-semibold ${titleTextColor}`}>Create Note</h2>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor="inputTitleField"
              className={`text-2xl font-semibold cursor-pointer ${titleTextColor}`}
              onClick={() => handleLabelClick(inputTitleRef)}
            >
              Title
            </label>
            <div>
              <textarea name="textarea"
                id="inputTitleField"
                className='title text-xl'
                style={{ backgroundColor: currentColor }}
                ref={titleRef}
              >
              </textarea>
            </div>
            {/* <div id='container-bubble'></div> */}
          </div>
          <div className='flex flex-col'>
          <label
              htmlFor="inputContentField"
              className={`text-2xl font-semibold cursor-pointer ${titleTextColor}`}
              onClick={() => handleLabelClick(inputContentRef)}
            >
              Contents
            </label>
            <div>
              <textarea name="textarea"
                id='inputContentField'
                className='content text-xl'
                style={{ backgroundColor: currentColor }}
                ref={contentRef}
              >
              </textarea>
            </div>
            <div className={`self-end text-sm font-normal ${titleTextColor}`}>Đã chỉnh sửa hôm 19/07/2023</div>
            {/* <div className='container' ref={wrapperRefSnow}></div> */}
          </div>
        </div>
        <div className='flex justify-between pl-[44px] pr-[54px] pt-[33px] pb-[66px]'>
          <div className='flex gap-[30px] items-center'>
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
          <div className='flex items-center gap-[30px] text-[32px]'>
            <RiFontSize className={`icon-note ${titleTextColor}`} />
            <BsListUl className={`icon-note ${titleTextColor}`} />
            <PiImageSquare className={`icon-note ${titleTextColor}`} />
            <IoMdNotificationsOutline className={`icon-note ${titleTextColor}`} />
            <BsShare className={`icon-note ${titleTextColor}`} />
            <BsArrowDownSquare className={`icon-note ${titleTextColor}`} />
            <MdPublic className={`icon-note ${titleTextColor}`} />
            <SlOptions className={`icon-note ${titleTextColor}`} />
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