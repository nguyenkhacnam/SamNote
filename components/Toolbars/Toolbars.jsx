import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { RiFontSize } from 'react-icons/ri'
import { BsListUl, BsShare, BsArrowDownSquare } from 'react-icons/bs'
import { PiImageSquare } from 'react-icons/pi'
import { MdPublic } from 'react-icons/md'
import { SlOptions } from 'react-icons/sl'

const Toolbars = ({ titleTextColor }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  return (
    <div className='
    grid items-center grid-cols-1 w-full text-[32px] absolute top-[85px] bg-[#FAE585] h-[73px]
    xl:flex xl:items-center xl:gap-[30px] xl:text-[32px] xl:sticky xl:bg-transparent xl:h-auto xl:w-auto
      '>
      <div className='flex justify-between px-[24px]
        xl:flex-none
      '>
        <RiFontSize
          className={`icon-note ${activeIcon === 'fontSize' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('fontSize')}
        />
        <BsListUl
          className={`icon-note ${activeIcon === 'listUl' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('listUl')}
        />
        <PiImageSquare
          className={`icon-note ${activeIcon === 'imageSquare' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('imageSquare')}
        />
        <IoMdNotificationsOutline
          className={`icon-note ${activeIcon === 'MdNotificationsOutline' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('MdNotificationsOutline')}
        />
        <BsShare
          className={`icon-note ${activeIcon === 'Share' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('Share')}
        />
        <BsArrowDownSquare
          className={`icon-note ${activeIcon === 'ArrowDownSquare' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('ArrowDownSquare')}
        />
        <MdPublic
          className={`icon-note ${activeIcon === 'Public' ? 'text-[#267BFA]' : ''} ${titleTextColor}`}
          onClick={() => setActiveIcon('Public')}
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