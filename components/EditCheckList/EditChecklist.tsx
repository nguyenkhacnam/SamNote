import React, { FC, useState, useEffect } from 'react';

interface EditChecklistProps {
  updateData: any
 }

interface ListItem {
  content: string;
  status: boolean;
}

const EditChecklist: FC<EditChecklistProps> = ({updateData}) => {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    updateData(list);
  }, [list, updateData]);

  const addEmptyItem = () => {
    setList([...list, { content: '', status: false }]);
  };

  const updateText = (value: string, index: number) => {
    const newList = [...list];
    newList[index].content = value;
    setList(newList);
  };

  const updateStatus = (index: number) => {
    const newList = [...list];
    newList[index].status = !newList[index].status;
    setList(newList);
  };

  const removeItem = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  return (
    <div className="">
      {list.length > 0 &&
        list.map((item, index) => {
          return (
            <div className="" key={index}>
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => updateStatus(index)}
              />
              <input
                type="text"
                onChange={(e) => {
                  updateText(e.target.value, index);
                }}
              />
              <div className="" onClick={() => removeItem(index)}>
                &times;
              </div>
            </div>
          );
        })}
      <div className="" onClick={addEmptyItem}>
        + Add task
      </div>
    </div>
  );
};

export default EditChecklist;
