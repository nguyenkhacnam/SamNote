import React from 'react';

interface ColorItemProps {
  color: string;
  onClick: (color: string) => void;
}

const ColorItem: React.FC<ColorItemProps> = ({ color, onClick }) => {
  const handleClick = () => {
    onClick(color);
  };

  return (
    <div
      className='w-6 h-6 xl:w-8 xl:h-8 rounded-full drop-shadow-3xl cursor-pointer'
      style={{ backgroundColor: color }}
      onClick={handleClick}
    ></div>
  );
};

export default ColorItem;
