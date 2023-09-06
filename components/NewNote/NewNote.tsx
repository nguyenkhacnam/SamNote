"use client"

import React from 'react'
import ColorItem from '../ColorItem/ColorItem'
import { useState, useCallback, useEffect } from 'react'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './NewNote.css'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { IoMdNotificationsOutline } from 'react-icons/io'
import { RiFontSize } from 'react-icons/ri'
import { BsListUl, BsShare, BsArrowDownSquare } from 'react-icons/bs'
import { PiImageSquare } from 'react-icons/pi'
import { MdPublic } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'


const NewNote = () => {
  const toolbar = [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]

  console.log('toolbar', toolbar)
  const colors: string[] = ['#FEF5CB', '#E0FCDB', '#FFDDED', '#E1CAFA', '#D8ECFF', '#E8E8E8', '#696969']
  const [currentColor, setCurrentColor] = useState('#FEF5CB')
  const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');

  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  console.log('value', value)
  console.log('value1', value1)
  // const wrapperRefSnow = useCallback((wrapper: HTMLDivElement | null) => {
  //   if (wrapper === null) return;

  //   wrapper.innerHTML = '';
  //   const editor = document.createElement('div');
  //   wrapper.appendChild(editor);
  //   new Quill(editor, { theme: 'snow' });

  //   return () => {
  //     wrapper.innerHTML = '';
  //   };
  // }, []);

  // useEffect(() => {
  //   new Quill('#container-bubble', { theme: 'bubble' });
  // }, [])

  const handleColorClick = (clickedColor: string) => {
    setCurrentColor(clickedColor);
    if (clickedColor === '#696969') {
      setTitleTextColor('text-white');
    } else {
      setTitleTextColor('text-[#000000]');
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='absolute min-w-[1368px] rounded-[20px]' style={{ backgroundColor: currentColor }}>
        <div className='pt-6 px-[68px] '>
          <div className='flex justify-center'>
            <h2 className={`text-2xl font-semibold ${titleTextColor}`}>Create Note</h2>
          </div>
          <div className='flex flex-col'>
            <h2 className={`text-2xl font-semibold ${titleTextColor}`}>Title</h2>
            {/* <div id='container-bubble'></div> */}
            <ReactQuill theme="bubble" value={value1} onChange={setValue1} />
          </div>
          <div className='flex flex-col'>
            <h2 className={`text-2xl font-semibold ${titleTextColor}`}>Contents</h2>
            {/* <div className='container' ref={wrapperRefSnow}></div> */}
            <ReactQuill theme="snow" value={value} onChange={setValue} />
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
          <div className='flex justify-center'>
            <RiFontSize />
            <BsListUl />
            <PiImageSquare />
            <IoMdNotificationsOutline />
            <BsShare />
            <BsArrowDownSquare/>
            <MdPublic/>
            <SlOptions/>
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