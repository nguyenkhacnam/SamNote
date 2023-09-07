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
import axios from 'axios'
import { useSelector } from 'react-redux'

interface RootState {
  user: {
    id: number;
    name: string;
  } | null;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
}

const NewNote = () => {
  const colors: string[] = ['#FEF5CB', '#E0FCDB', '#FFDDED', '#E1CAFA', '#D8ECFF', '#E8E8E8', '#696969']
  const initialColor = {
    r: 254,
    g: 245,
    b: 203,
    a: 1,
  }
  const titleRef = useRef();
  const contentRef = useRef();
  const inputTitleRef = useRef(null);
  const inputContentRef = useRef(null);

  const [currentColor, setCurrentColor] = useState('#FEF5CB')
  const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');
  const [valueTitle, setValueTitle] = useState('')
  const [valueContents, setValueContents] = useState('')
  const [color, setColor] = useState<RootState['color']>(initialColor)
  const [idFolder, setIdFolder] = useState(0)
  const [dueAt, setDueAt] = useState(null)
  const [remindAt, setRemindAt] = useState(null)
  const [lock, setLock] = useState(null)
  const [notePublic, setNotePublic] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [share, setShare] = useState(null)
  const [type, setType] = useState('text')

  // console.log('datasaldkfj', valueTitle, color, idFolder, remindAt)
  const userData: RootState['user'] = useSelector((state: RootState) => state.user)
  const userId: number | undefined = userData?.id
  // console.log('user', userData)
  // console.log('user', userData?.id)

  const hexToRgba = (hex: string, alpha: number = 1): RootState['color'] | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return {
        r,
        g,
        b,
        a: alpha,
      };
    }

    return null;
  }

  const handleColorClick = (clickedColor: string) => {
    // console.log('color da chon', clickedColor)
    setCurrentColor(clickedColor);
    const rgbaColor = hexToRgba(clickedColor);
    if (rgbaColor) {
      // console.log('color hex', rgbaColor)
      setColor(rgbaColor);
    } else {
      console.error('Invalid HEX color:', clickedColor);
    }
    if (clickedColor === '#696969') {
      setTitleTextColor('text-white');
    } else {
      setTitleTextColor('text-[#000000]');
    }
  };


  const setupAutoResize = (ref: any) => {
    const handleKeyUp = (event: any) => {
      ref.current.style.height = 'auto';
      const scHeight = event.target.scrollHeight;
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

  const handleLabelClick = (ref: any) => {
    ref.current?.focus();
  };

  useEffect(() => {
    setupAutoResize(titleRef);
    setupAutoResize(contentRef);
  }, []);

  const handleTitleChange = (event: any) => {
    console.log('title', event.target.value)
    setValueTitle(event.target.value);
  };

  const handleContentsChange = (event: any) => {
    console.log('contents', event.target.value)
    setValueContents(event.target.value);
  };

  const createNewNote = async () => {
    try {
      const requestBody = {
        color,
        data: valueContents,
        idFolder,
        dueAt,
        remindAt,
        lock,
        notePublic,
        pinned,
        share,
        title: valueTitle,
        type,
      };

      const response = await axios.post(`https://14.225.7.221:18011/notes/${userId}`, requestBody);
      console.log('New note created:', response.data);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  const handleClickBtn = () => {
    createNewNote();
  };

  return (
    <div className='xl:flex xl:justify-center 
    flex justify-center'>
      <div className=' xl:flex xl:flex-col xl:justify-between xl:min-w-[1368px] xl:max-w-[1000px] xl:min-h-[587px] xl:rounded-[20px]
      flex flex-col justify-between min-w-[382px] max-w-[639px] min-h-[587px] rounded-[20px]' style={{ backgroundColor: currentColor }}>
        <div className=' xl:relative xl:pt-6 xl:px-[68px] 
        relative pt-6 px-[68px] '>
          <div className=' xl:absolute xl:right-[68px] xl:w-[35px] xl:h-[35px] xl:bg-white xl:flex xl:justify-center xl:items-center xl:rounded-full
          absolute right-[68px] w-[35px] h-[35px] bg-white flex justify-center items-center rounded-full'>
            <BsPin className=' xl:text-[28px] xl:cursor-pointer
            text-[28px] cursor-pointer' />
          </div>
          <div className=' xl:flex xl:justify-center
          flex justify-center'>
            <h2 className={`text-2xl font-semibold ${titleTextColor}`}>Create Note</h2>
          </div>
          <div className=' xl:flex xl:flex-col
          flex flex-col'>
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
                className=' xl:title xl:text-xl
                title text-xl'
                style={{ backgroundColor: currentColor }}
                ref={titleRef}
                onChange={handleTitleChange}
              >
              </textarea>
            </div>
            {/* <div id='container-bubble'></div> */}
          </div>
          <div className=' xl:flex xl:flex-col
          flex flex-col'>
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
                className=' xl:content xl:text-xl
                content text-xl'
                style={{ backgroundColor: currentColor }}
                ref={contentRef}
                onChange={handleContentsChange}
              >
              </textarea>
            </div>
            <div className={`self-end text-sm font-normal ${titleTextColor}`}>Đã chỉnh sửa hôm 19/07/2023</div>
            {/* <div className='container' ref={wrapperRefSnow}></div> */}
            {/* <div className='container' ref={wrapperRefSnow}></div> */}
          </div>
        </div>
        <div className=' xl:flex xl:justify-between xl:pl-[44px] xl:pr-[54px] xl:pt-[33px] xl:pb-[66px] xl:sticky
        flex justify-between pl-[44px] pr-[54px] pt-[33px] pb-[66px]'>
          <div className='xl:flex xl:gap-[30px] xl:items-center
          flex gap-[30px] items-center'>
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
          <div className=' xl:flex xl:items-center xl:gap-[30px] xl:text-[32px] xl:sticky xl:bg-transparent
          flex items-center gap-[30px] text-[32px] absolute top-[140px] bg-slate-500'>
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
            <button
              onClick={handleClickBtn}
              className=' xl:w-[114px] xl:h-[50px] xl:bg-[#FFFFFF] xl:text-[24px] xl:font-semibold xl:rounded-[30px]
            w-[114px] h-[50px] bg-[#FFFFFF] text-[24px] font-semibold rounded-[30px]'>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewNote