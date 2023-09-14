"use client";
import { FC, useState } from "react";
import UpdateNote from "@/components/UpdateNote/UpdateNote";
import { useSelector } from "react-redux";
import axios from "axios";
interface UpdateNoteProps {
  params: {
    id: number
  }
}

const UpdateNote1: FC<UpdateNoteProps> = ({ params }) => {
  // console.log('param', params.id)
  const titleUpdateNote: string = 'Update Note'
  const btnUpdateNote: string = 'Update'
  // console.log('titleUpdateNote', titleUpdateNote)
  const notes: any = useSelector((state: any) => state.notes.notes);
  // console.log('notes data', notes)
  // Tìm note cụ thể bằng idNote
  const idNumber = +params.id
  const selectedNote = notes?.find((note: any) => note.idNote === idNumber);
  console.log('selectedNote', selectedNote)
  const { color, data, title, type} = selectedNote

  const [valueTitle, setValueTitle] = useState<string>('')
  const [valueContents, setValueContents] = useState('')
  const [colorUpdate, setColorUpdate] = useState(selectedNote.color)
  const handleChildValueChange = (title: string) => {
    // console.log('day la du lieu chuan chi', title)
    setValueTitle(title);
  };
  const handleChildValueChange1 = (content: string) => {
    // console.log('day la du lieu chuan chi content', content)
    setValueContents(content);
  };

 const handleValueColor = (ValueColor: any) => {
    // console.log('day la du lieu chuan chi content', content)
    setColorUpdate(ValueColor);
  };

  const updateNote = async () => {
    try {
      const requestBody = {
        color: colorUpdate ? colorUpdate : color,
        data: valueContents ? valueContents : data,
        title: valueTitle ? valueTitle : title,
        type
      };

      const response = await axios.patch(`https://lhvn.online/notes/${idNumber}`, requestBody);
      console.log('Update note success:', response.data.note);
      // dispatch(getAllNotes(response.data.note));
      // const { updateAt } = response.data.note //color, idFolder, dueAt, remindAt, lock, notePublic, pinned, share, type
      // setUpdateAt(updateAt)
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  const handleClickBtnUpdate = () => {
    updateNote()
  }
  return (
    <div>
      {/* <UpdateNote1
        idNote={params?.id}
        color={{
          r: 0,
          g: 0,
          b: 0,
          a: 0
        }}
      /> */}
      <UpdateNote 
        titleUpdateNote={titleUpdateNote}
        selectedNote={selectedNote}
        onClickBtnUpdate={handleClickBtnUpdate}
        btnUpdateNote={btnUpdateNote}
        onChildValueChange={handleChildValueChange}
        onChildValueChange1={handleChildValueChange1}
        onValueColor={handleValueColor}
        colorCurrent={color}
        idNumber={idNumber}
      />
    </div>
  );
};

export default UpdateNote1;