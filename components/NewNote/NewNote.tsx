"use client"

import React, { FC } from 'react'
import ColorItem from '../ColorItem/ColorItem'
import Toolbars from '../Toolbars/Toolbars'
import './NewNote.css'
import { useState, useRef, useEffect } from 'react'

import { BsPin } from 'react-icons/bs'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

interface NewNoteProps {
  user: {
    id: number;
    name: string;
  },
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
}

const NewNote: FC<NewNoteProps> = ({ }) => {
  const colors: string[] = ['#FEF5CB', '#E0FCDB', '#FFDDED', '#E1CAFA', '#D8ECFF', '#E8E8E8', '#696969']
  const initialColor = {
    r: 254,
    g: 245,
    b: 203,
    a: 1,
  }

  const router = useRouter()

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const inputTitleRef = useRef(null);
  const inputContentRef = useRef(null);

  const [currentColor, setCurrentColor] = useState('#FEF5CB')
  const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');
  const [valueTitle, setValueTitle] = useState('')
  const [valueContents, setValueContents] = useState('')
  const [color, setColor] = useState<NewNoteProps['color']>(initialColor)
  const [idFolder, setIdFolder] = useState(null)
  const [dueAt, setDueAt] = useState(null)
  const [remindAt, setRemindAt] = useState(null)
  const [lock, setLock] = useState(null)
  const [notePublic, setNotePublic] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [share, setShare] = useState(null)
  const [type, setType] = useState('text')
  const [updateAt, setUpdateAt] = useState('')
  const [isNoteEdited, setIsNoteEdited] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  // console.log('datasaldkfj', valueTitle, color, idFolder, remindAt)
  const userData: NewNoteProps['user'] = useSelector((state: NewNoteProps) => state.user)
  const userId: number | undefined = userData?.id
  // console.log('user', userData)
  // console.log('user', userData?.id)

  const hexToRgba = (hex: string, alpha: number = 1): NewNoteProps['color'] | null => {
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

      const response = await axios.post(`https://lhvn.online/notes/${userId}`, requestBody);
      console.log('New note created:', response.data.note);
      const { updateAt } = response.data.note //color, idFolder, dueAt, remindAt, lock, notePublic, pinned, share, type
      setUpdateAt(updateAt)
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  const handleClickBtn = async () => {
    await createNewNote();
    router.push('/')
  };

  return (
    <div className='bg-[#d84646] w-full
    xl:bg-transparent'>
      <div className='xl:flex xl:justify-center xl:mt-0
      flex justify-center mt-[177px] '>
        <div className={` xl:flex xl:flex-col xl:justify-between xl:min-w-[1368px] xl:max-w-[1000px] xl:min-h-[587px] xl:rounded-[20px]
        flex flex-col justify-between relative min-w-full max-w-[640px] rounded-[20px] bg-[${currentColor}]`} style={{ backgroundColor: currentColor }}>
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
              <div className={`self-end text-sm font-normal ${titleTextColor}`}>
                {
                  isNoteEdited ? `Đã chỉnh sửa hôm ${updateAt}` : ''
                }
              </div>
              {/* <div className='container' ref={wrapperRefSnow}></div> */}
              {/* <div className='container' ref={wrapperRefSnow}></div> */}
            </div>
          </div>
          <div className=' xl:flex xl:justify-between xl:pl-[44px] xl:pr-[54px] xl:pt-[33px] xl:pb-[66px] xl:sticky
          flex justify-between pt-[33px] pb-[66px]'>
            <div className='
            xl:flex xl:gap-[30px] xl:items-center
            flex items-center'>
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
              <Toolbars titleTextColor={titleTextColor}/>
              {/* <div className=' xl:flex xl:items-center xl:gap-[30px] xl:text-[32px] xl:sticky xl:bg-transparent xl:h-auto xl:w-auto
            flex items-center gap-[30px] text-[32px] absolute top-[104px] bg-[#D9D9D9] h-[73px]'>
              <RiFontSize className={`icon-note text-[#267BFA] ${titleTextColor}`} />
              <BsListUl className={`icon-note ${titleTextColor}`} />
              <PiImageSquare className={`icon-note ${titleTextColor}`} />
              <IoMdNotificationsOutline className={`icon-note ${titleTextColor}`} />
              <BsShare className={`icon-note ${titleTextColor}`} />
              <BsArrowDownSquare className={`icon-note ${titleTextColor}`} />
              <MdPublic className={`icon-note ${titleTextColor}`} />
              <SlOptions className={`icon-note ${titleTextColor}`} />
            </div> */}
            <div>
              <button
                onClick={handleClickBtn}
                className=' xl:w-[114px] xl:h-[50px] xl:bg-[#FFFFFF] xl:text-[24px] xl:font-semibold xl:rounded-[30px]
              w-[114px] h-[50px] bg-[#FFFFFF] text-[24px] font-semibold rounded-[30px]'>Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewNote