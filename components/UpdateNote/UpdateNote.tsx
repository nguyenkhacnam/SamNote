"use client"

import React, { FC } from 'react';
import { BsPin } from 'react-icons/bs'
import ColorItem from '../ColorItem/ColorItem'
import Toolbars from '../Toolbars/Toolbars'
import '../NewNote/NewNote.css'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { getAllNotes } from "@/redux/feature/NotesSlice";
import Link from 'next/link';
import { IoChevronBackSharp, IoCloseOutline } from 'react-icons/io5';
import ColorNote from '../ColorNote/ColorNote';
import FontNote from '../FontNote/FontNote';
import ColorFontPanel from '../ColorFontPanel/ColorFontPanel';

interface UpdateNoteProps {
  idNote: number
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }
  createNote: string
  onChildValueChange: (newValue: string) => void
}

const UpdateNote: FC<UpdateNoteProps> = ({ idNote, createNote, onChildValueChange }) => {
  // Lấy danh sách các notes từ Redux store
  // const notes: any = useSelector((state: any) => state.notes.notes);
  // console.log('notes data', notes)
  const colors: string[] = ['#FEF5CB', '#E0FCDB', '#FFDDED', '#E1CAFA', '#D8ECFF', '#E8E8E8', '#696969']

  const router = useRouter()
  const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');
  // const [rgbaColor, setRgbaColor] = useState(selectedNote.color);
  // const [color, setColor] = useState<UpdateNoteProps['color']>(selectedNote.color)
  // const [idFolder, setIdFolder] = useState(selectedNote.idFolder)
  // const [dueAt, setDueAt] = useState(selectedNote.dueAt)
  // const [remindAt, setRemindAt] = useState(selectedNote.remindAt)
  // const [lock, setLock] = useState(selectedNote.lock)
  // const [notePublic, setNotePublic] = useState(selectedNote.notePublic)
  // const [pinned, setPinned] = useState(selectedNote.pinned)
  // const [share, setShare] = useState(selectedNote.share)
  // const [type, setType] = useState(selectedNote.type)
  // const [updateAt, setUpdateAt] = useState(selectedNote.updateAt)
  const [isNoteEdited, setIsNoteEdited] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  // const [createAt, setCreateAt] = useState(selectedNote.createAt);
  const [currentColor, setCurrentColor] = useState('#FEF5CB')

  const [hasChanged, setHasChanged] = useState(false);
  const [isVisible, setIsVisible] = useState(true)

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const inputTitleRef = useRef(null);
  const inputContentRef = useRef(null);

  const [valueTitle, setValueTitle] = useState('')
  const [valueContents, setValueContents] = useState('')

  const handleTitleChange = (event: any) => {
    console.log('title', event.target.value);
    setValueTitle(event.target.value);
    console.log('setHasChanged', hasChanged)
    setHasChanged(true)
  };

  const handleContentsChange = (event: any) => {
    console.log('contents', event.target.value);
    // setValueContents(event.target.value);
    setHasChanged(true)
  };




  function rgbaToHex(rgbaColor: { r: number; g: number; b: number; a: number }): string {
    const { r, g, b, a } = rgbaColor;

    // Chuyển đổi giá trị rgba thành các số nguyên từ 0 đến 255
    const rInt = Math.round(r);
    const gInt = Math.round(g);
    const bInt = Math.round(b);

    // Chuyển đổi alpha thành giá trị từ 0 đến 255
    const aInt = Math.round(a * 255);

    // Chuyển đổi giá trị thành chuỗi hex
    const rHex = rInt.toString(16).padStart(2, '0');
    const gHex = gInt.toString(16).padStart(2, '0');
    const bHex = bInt.toString(16).padStart(2, '0');
    const aHex = aInt.toString(16).padStart(2, '0');

    // Kết hợp các giá trị hex để tạo chuỗi hex hoàn chỉnh
    const hexColor = `#${rHex}${gHex}${bHex}${aHex}`;

    return hexColor;
  }


  function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } | null {
    // Kiểm tra xem chuỗi HEX có đúng định dạng không
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const result = hexRegex.exec(hex);

    if (!result) {
      return null; // Chuỗi không hợp lệ
    }

    // Lấy giá trị từ chuỗi HEX và chuyển đổi thành số nguyên
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    const a = result[4] ? parseInt(result[4], 16) / 255 : 1;

    return { r, g, b, a };
  }

  const handleColorClick = (clickedColor: string) => {
    console.log('user click color khác trong update', clickedColor)
    setCurrentColor(clickedColor);
    const rgbaColor1 = hexToRgba(clickedColor);
    if (rgbaColor1) {
      console.log('color hex to rgba', rgbaColor1)
      // setColor(rgbaColor1);
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

  const updateNote = async () => {
    // try {
    //   const requestBody = {
    //     color,
    //     data: valueContents,
    //     title: valueTitle,
    //     type
    //   };

    //   const response = await axios.patch(`https://lhvn.online/notes/${idNote}`, requestBody);
    //   console.log('Update note success:', response.data.note);
    //   // dispatch(getAllNotes(response.data.note));
    //   // const { updateAt } = response.data.note //color, idFolder, dueAt, remindAt, lock, notePublic, pinned, share, type
    //   // setUpdateAt(updateAt)
    // } catch (error) {
    //   console.error('Error creating new note:', error);
    // }
  };

  const handleClickUpdateNote = () => {
    updateNote()
    router.back()
  };

  const handleBackClick = () => {
    if (hasChanged && window.confirm('Bạn có muốn lưu ghi chú trước khi rời khỏi trang?')) {
      updateNote()
      router.back()
      console.log('back co du lieu')
    } else {
      router.back()
      console.log('back k du lieu')
    }
  };

  const handleClickFontSize = () => {
    console.log('da click')
    setIsVisible(!isVisible);
  }
  const handleVisible = () => {
    
  }

  // useEffect(() => {
  //   // setValueTitle(selectedNote.title);
  //   // setValueContents(selectedNote.data);
  // }, [selectedNote]);

  // useEffect(() => {
  //   if (createAt) {
  //     setIsNoteEdited(true);
  //   }
  // }, [createAt]);

  useEffect(() => {
    setupAutoResize(titleRef);
    setupAutoResize(contentRef);
  }, []);

  return (
    <div className=''>
      <div className='bg-[#F7F7F7] w-full h-screen flex flex-col justify-between -mt-[26px]
      xl:bg-transparent xl:mt-0 xl:h-auto'>
        <div className=' flex justify-between items-center mt-[30px]
        xl:hidden'>
          <div
            onClick={handleBackClick}
          >
            <IoChevronBackSharp className='w-6 h-6 self-center cursor-pointer' />
          </div>
          <div className='flex-1 min-h-[30px]'><h2 className='text-[20px] text-center font-semibold self-center'>{}</h2></div>
        </div>
        <div className='mx-[-23px]
          xl:hidden
        '>
          <Toolbars
            titleTextColor={titleTextColor}
            idNote={idNote}
            onClick={handleClickFontSize}
          />
        </div>
        <div className='xl:flex xl:justify-center xl:mt-0 xl:pt-0 xl:flex-none
        flex justify-center mt-[100px] flex-1'>
          <div className={` xl:flex xl:flex-col xl:justify-between xl:min-w-[1368px] xl:max-w-[1000px] xl:min-h-[587px] xl:rounded-[20px]
          // flex flex-col justify-between relative min-w-full max-w-[640px] h-auto rounded-[20px] shadow-md `} style={{ backgroundColor: currentColor }}>
            <div className='xl:pt-6 xl:px-[68px] xl:block
             px-[22px] h-full'>
              <div className=' xl:absolute xl:right-[68px] xl:w-[35px] xl:h-[35px] xl:bg-white xl:flex xl:justify-center xl:items-center xl:rounded-full
              w-[35px] h-[35px] bg-white justify-center items-center rounded-full hidden'>
                <BsPin className=' xl:text-[28px] xl:cursor-pointer
                text-[28px] cursor-pointer' />
              </div>
              <div className=' xl:flex xl:justify-center
              justify-center hidden '>
                <h2 className={`text-2xl font-semibold ${titleTextColor}`}>{createNote}</h2>
              </div>
              <div className=' xl:flex xl:flex-col
              '>
                <label
                  htmlFor="inputTitleField"
                  className={`text-2xl font-semibold cursor-pointer hidden xl:flex ${titleTextColor}`}
                  onClick={() => handleLabelClick(inputTitleRef)}
                >
                  Title
                </label>
                <div>
                  <textarea name="textarea"
                    id="inputTitleField"
                    className=' xl:title xl:text-xl
                    title text-lg'
                    // style={{ backgroundColor: currentColor }}
                    ref={titleRef}
                    placeholder='Title...'
                    // value={valueTitle}
                    onChange={handleTitleChange}
                  >
                  </textarea>
                </div>
              </div>
              <div className=' xl:flex xl:flex-col
              flex flex-col'>
                <label
                  htmlFor="inputContentField"
                  className={`text-2xl font-semibold cursor-pointer hidden xl:flex ${titleTextColor}`}
                  onClick={() => handleLabelClick(inputContentRef)}
                >
                  Contents
                </label>
                <div>
                  <textarea name="textarea"
                    id='inputContentField'
                    className='xl:text-xl
                    content text-xs'
                    // style={{ backgroundColor: currentColor }}
                    ref={contentRef}
                    placeholder='Contents...'
                    onChange={handleContentsChange}
                    // value={valueContents}
                  >
                  </textarea>
                </div>
                {/* <div className={`self-end text-sm font-normal ${titleTextColor}`}>
                  {
                    isNoteEdited ? `Đã chỉnh sửa hôm ${updateAt}` : ''
                  }
                </div> */}
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
              <div className='hidden xl:block'><Toolbars titleTextColor={titleTextColor} idNote={idNote} /></div>
              <div>
                <button
                  onClick={handleClickUpdateNote}
                  className='xl:block xl:w-[114px] xl:h-[50px] xl:bg-[#FFFFFF] xl:text-[24px] xl:font-semibold xl:rounded-[30px]
                hidden w-[114px] h-[50px] bg-[#FFFFFF] text-[24px] font-semibold rounded-[30px]'>Update</button>
              </div>
            </div>
          </div>
        </div>
        <ColorFontPanel 
          // setCurrentColor={setCurrentColor}
          // setColor={setColor}
          setTitleTextColor={setTitleTextColor}
          hexToRgba={hexToRgba}
          setHasChanged={setHasChanged}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </div>
    </div>
  )
};

export default UpdateNote;
