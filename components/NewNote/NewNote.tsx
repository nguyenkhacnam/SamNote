"use client"

import React, { FC } from 'react'
import ColorItem from '../ColorItem/ColorItem'
import Toolbars from '../Toolbars/Toolbars'
import './NewNote.css'
import { useState, useRef, useEffect } from 'react'

import { BsPin } from 'react-icons/bs'
import { IoChevronBackSharp } from 'react-icons/io5'
import { IoCloseOutline } from 'react-icons/io5'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ColorNote from '../ColorNote/ColorNote'
import FontNote from '../FontNote/FontNote';

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
  const [outputList, setOutputList] = useState([]);
  const [isVisible, setIsVisible] = useState(true)

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

  const handleClickFontSize = () => {
    console.log('da click')
    setIsVisible(!isVisible);
  }
  
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
    const lines = valueContents.split('\n');
    const olList: any = lines.map((line, index) => (
      <li key={index}>{line}</li>
    ));

    setOutputList(olList);
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
    <div className=''>
      <div className='bg-[#F7F7F7] w-full h-full
      xl:bg-transparent'>
        <div className=' flex justify-between items-center mt-[30px]
        xl:hidden'>
          <Link href='/'><IoChevronBackSharp className='w-6 h-6 self-center cursor-pointer' /></Link>
          <div className='flex-1 min-h-[30px]'><h2 className='text-[20px] text-center font-semibold self-center'>{valueTitle}</h2></div>
        </div>
        <div className='  mx-[-23px]
          xl:hidden
        '>
          <Toolbars titleTextColor={titleTextColor} />
        </div>
        <div className='xl:flex xl:justify-center xl:mt-0 xl:pt-0
        flex justify-center mt-[100px]'>
          <div className={` xl:flex xl:flex-col xl:justify-between xl:min-w-[1368px] xl:max-w-[1000px] xl:min-h-[587px] xl:rounded-[20px]
          flex flex-col justify-between relative min-w-full max-w-[640px] h-auto rounded-[20px] shadow-md bg-[${currentColor}]`} style={{ backgroundColor: currentColor }}>
            <div className='xl:pt-6 xl:px-[68px] xl:block
             px-[22px]'>
              <div className=' xl:absolute xl:right-[68px] xl:w-[35px] xl:h-[35px] xl:bg-white xl:flex xl:justify-center xl:items-center xl:rounded-full
              w-[35px] h-[35px] bg-white justify-center items-center rounded-full hidden'>
                <BsPin className=' xl:text-[28px] xl:cursor-pointer
                text-[28px] cursor-pointer' />
              </div>
              <div className=' xl:flex xl:justify-center
              justify-center hidden '>
                <h2 className={`text-2xl font-semibold ${titleTextColor}`}>Create Note</h2>
              </div>
              <div className=' xl:flex xl:flex-col
              '>
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
                    title text-lg'
                    style={{ backgroundColor: currentColor }}
                    ref={titleRef}
                    placeholder='Title...'
                    onChange={handleTitleChange}
                  >
                  </textarea>
                </div>
              </div>
              <div className=' xl:flex xl:flex-col
              flex flex-col'>
                <label
                  htmlFor="inputContentField"
                  className={`text-2xl font-semibold cursor-pointer xl:flex ${titleTextColor}`}
                  onClick={() => handleLabelClick(inputContentRef)}
                >
                  Contents
                </label>
                <div>
                  <textarea name="textarea"
                    id='inputContentField'
                    className='xl:text-xl
                    content text-xs'
                    style={{ backgroundColor: currentColor }}
                    ref={contentRef}
                    placeholder='Contents...'
                    onChange={handleContentsChange}
                  >
                  </textarea>
                </div>
                <div className={`self-end text-sm font-normal ${titleTextColor}`}>
                  {
                    isNoteEdited ? `Đã chỉnh sửa hôm ${updateAt}` : ''
                  }
                </div>
              </div>
            </div>

            <div className=' xl:flex xl:justify-between xl:pl-[44px] xl:pr-[54px] xl:pt-[33px] xl:pb-[66px]
            flex justify-between pt-0 pb-0'>

              <div className='items-center xl:sticky
              xl:flex xl:gap-[30px] xl:items-center absolute hidden
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
              <div className='hidden xl:block'><Toolbars titleTextColor={titleTextColor} /></div>
              <div>
                <button
                  onClick={handleClickBtn}
                  className='xl:block xl:w-[114px] xl:h-[50px] xl:bg-[#FFFFFF] xl:text-[24px] xl:font-semibold xl:rounded-[30px]
                hidden w-[114px] h-[50px] bg-[#FFFFFF] text-[24px] font-semibold rounded-[30px]'>Done</button>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex flex-col justify-center items-center w-full h-[145px] bg-[#D9D9D9] rounded-[30px] px-[20px] mt-[25px]
            xl:hidden'>
          <div className='self-end w-[12px] h-[12px] cursor-pointer'>
            <IoCloseOutline />
          </div>
          <div className='w-full flex flex-col gap-[7px]'>
            <p>Color</p>
            <ColorNote
              setCurrentColor={setCurrentColor}
              setColor={setColor}
              setTitleTextColor={setTitleTextColor}
              hexToRgba={hexToRgba}
            />
          </div>
          <div className='w-full flex flex-col gap-[7px]'>
            <p>Font</p>
            <ColorNote
              setCurrentColor={setCurrentColor}
              setColor={setColor}
              setTitleTextColor={setTitleTextColor}
              hexToRgba={hexToRgba}
            />
          </div>
        </div>
        <div>
          <ol>{outputList}</ol> {/* Hiển thị danh sách dạng <ol> ở đây */}
        </div>
      </div>
    </div>
  )
}

export default NewNote