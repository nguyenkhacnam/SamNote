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
      className='w-8 h-8 rounded-full drop-shadow-3xl'
      style={{ backgroundColor: color }}
      onClick={handleClick}
    ></div>
  );
};

export default ColorItem;
