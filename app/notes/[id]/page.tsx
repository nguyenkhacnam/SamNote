"use client";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { updateNote as updateNoteService } from '../../../services/noteService';

import CreateUpdateNote from "@/components/CreateUpdateNote/CreateUpdateNote";
import axios from "axios";
interface UpdateNoteProps {
  params: {
    id: number
  }
}


const UpdateNote: FC<UpdateNoteProps> = ({ params }) => {

  const titleUpdateNote: string = 'Update Note'
  const btnUpdateNote: string = 'Update'

  const notes: any = useSelector((state: any) => state.notes.notes);
  const idNumber = +params.id
  interface SelectedNote {
    color: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    title: string;
    data: string;
    type: string;
  }
  const selectedNote: SelectedNote = notes?.find((note: any) => note.idNote === idNumber);
  const { color, title, data, type } = selectedNote

  const [valueTitle, setValueTitle] = useState<string>('')
  const [valueContents, setValueContents] = useState<string>('')
  const [colorUpdate, setColorUpdate] = useState(selectedNote?.color)

  const handleChildValueChange = (title: string) => {
    setValueTitle(title);
  };
  const handleChildValueChange1 = (content: string) => {
    setValueContents(content);
  };

 const handleValueColor = (ValueColor: any) => {
    setColorUpdate(ValueColor);
  };

  const updateNote = async () => {
    try {
      const requestBody: SelectedNote = {
        color: colorUpdate ? colorUpdate : color,
        data: valueContents ? valueContents : data,
        title: valueTitle ? valueTitle : title,
        type: type
      };

      const response = await updateNoteService(idNumber, requestBody);
      console.log('Update note success:', response.note);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  const handleClickBtnUpdate = () => {
    updateNote()
  }
  return (
    <div>
      <CreateUpdateNote 
        titleUpdateNote={titleUpdateNote}
        selectedNote={selectedNote}
        onClickBtnUpdate={handleClickBtnUpdate}
        btnUpdateNote={btnUpdateNote}
        onChildValueChange={handleChildValueChange}
        onChildValueChange1={handleChildValueChange1}
        onValueColor={handleValueColor}
        colorCurrent={color}
        idNumber={idNumber} idNote={0} createNote={""} onClickBtn={function (): void {
          throw new Error("Function not implemented.");
        } } btnCreateNote={""} onColor={undefined}      />
    </div>
  );
};

export default UpdateNote;