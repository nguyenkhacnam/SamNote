"use client"
import React, { FC, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RiDeleteBinLine, RiFontSize } from 'react-icons/ri'
import { BsListUl, BsShare, BsArrowDownSquare } from 'react-icons/bs'
import { PiImageSquare } from 'react-icons/pi'
import { MdPublic } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'
import { GoPencil } from 'react-icons/go'
import { HiOutlineMicrophone } from 'react-icons/hi2'
import { CiLock } from 'react-icons/ci'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Popconfirm, message } from 'antd'


interface ToolbarsProps {
  titleTextColor: string,
  idNote: number,
  setActiveIcon: (iconName: string) => void
  // confirm: (e: React.MouseEvent<HTMLElement>) => void;
  // cancel: (e: React.MouseEvent<HTMLElement>) => void;
  onClick: () => void;
}

const Toolbars: FC<ToolbarsProps> = ({ titleTextColor, idNote, onClick }) => {
  const [activeIcon, setActiveIcon] = useState('');

  const router = useRouter()

  const handleDelete = async () => {
    const apiUrl = `https://lhvn.online/notes/${idNote}`;
    try {
      await axios.delete(apiUrl);
    } catch (error) {
      console.error('Xóa thất bại:', error);
    }
  }

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('delete success');
    handleDelete();
    router.back()
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    // message.error('Click on No');
    console.log('bo xoa')
  };

  const handleToolbar = () => {
    onClick()
  }

  return (
    <div className='
    grid items-center grid-cols-1 w-full text-[32px] absolute top-[60px] bg-[#FAE585] h-[73px]
    xl:flex xl:items-center xl:gap-[30px] xl:text-[32px] xl:sticky xl:bg-transparent xl:h-auto xl:w-auto
      '>
      <div className='flex justify-between px-[24px]
        xl:flex-none
      '>
        <div onClick={handleToolbar}>
          <RiFontSize
            className={`icon-note ${activeIcon === 'fontSize' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
            onClick={() => setActiveIcon('fontSize')}
          />
        </div>
        <div onClick={handleToolbar}>
          <GoPencil
            className={`icon-note xl:hidden ${activeIcon === 'Pencil' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
            onClick={() => setActiveIcon('Pencil')}
          />
        </div>
        <BsListUl
          className={`icon-note hidden xl:block ${activeIcon === 'listUl' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('listUl')}
        />
        <PiImageSquare
          className={`icon-note ${activeIcon === 'imageSquare' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('imageSquare')}
        />
        <HiOutlineMicrophone
          className={`icon-note xl:hidden ${activeIcon === 'outlineMicrophone' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('outlineMicrophone')}
        />
        <IoMdNotificationsOutline
          className={`icon-note ${activeIcon === 'MdNotificationsOutline' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('MdNotificationsOutline')}
        />
        <BsShare
          className={`icon-note hidden xl:block ${activeIcon === 'Share' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('Share')}
        />
        <BsArrowDownSquare
          className={`icon-note hidden xl:block ${activeIcon === 'ArrowDownSquare' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('ArrowDownSquare')}
        />
        <MdPublic
          className={`icon-note hidden xl:block ${activeIcon === 'Public' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('Public')}
        />
        <Popconfirm
          title="Xóa ghi chú"
          description="Bạn có chắc chắn xóa ghi chú này không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <RiDeleteBinLine
            className={`icon-note xl:hidden ${activeIcon === 'DeleteBinLine' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
            onClick={() => setActiveIcon('DeleteBinLine')}
          />
          {/* {showConfirmation && (
            <div>
              <p className='text-[3px]'>Bạn có chắc chắn muốn xóa?</p>
              <button onClick={confirmDelete}>Có</button>
              <button onClick={cancelDelete}>Không</button>
            </div>
          )} */}
        </Popconfirm>
        <CiLock
          className={`icon-note xl:hidden ${activeIcon === 'Lock' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('Lock')}
        />
        <SlOptions
          className={`icon-note ${activeIcon === 'Options' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('Options')}
        />
      </div>
    </div>
  )
}

export default Toolbars