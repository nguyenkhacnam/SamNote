"use client";

import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { addNote } from '../../services/noteService';
import CreateUpdateNote from "@/components/CreateUpdateNote/CreateUpdateNote";

interface AddNoteProps {
  // color: {
  //   r: number;
  //   g: number;
  //   b: number;
  //   a: number;
  // },
  // user: {
  //   id: number;
  //   name: string;
  // },
 }

const AddNote: FC<AddNoteProps> = ({ }) => {
  const userData: any = useSelector((state: any) => state.user)
  const userId: number = userData?.id

  const initialColor = {
    r: 254,
    g: 245,
    b: 203,
    a: 1,
  }
  const createNote: string = 'Create Note'
  const btnCreateNote: string = 'Done'
  const [currentColor, setCurrentColor] = useState<string>('#FEF5CB');
  const [valueTitle, setValueTitle] = useState<string>('');
  const [valueContents, setValueContents] = useState<string>('');
  const [color, setColor] = useState(initialColor);
  const [idFolder, setIdFolder] = useState<string | null>(null);
  const [dueAt, setDueAt] = useState<Date | null>(null);
  const [remindAt, setRemindAt] = useState<Date | null>(null);
  const [lock, setLock] = useState<string | null>(null);
  const [notePublic, setNotePublic] = useState<number>(0);
  const [pinned, setPinned] = useState<boolean>(false);
  const [share, setShare] = useState<string | null>(null);
  const [type, setType] = useState<string>('text')
  // const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');
  // const [updateAt, setUpdateAt] = useState('')
  // const [isNoteEdited, setIsNoteEdited] = useState(false);
  // const [activeIcon, setActiveIcon] = useState(null);
  // const [outputList, setOutputList] = useState([]);
  // const [isVisible, setIsVisible] = useState(true)

  const handleChildValueChange = (title: string) => {
    setValueTitle(title);
  };
  const handleChildValueChange1 = (content: string) => {
    setValueContents(content);
  };

  const handleColor = (colored: any) => {
    setColor(colored)
  }

  const handleClickBtn = () => {
    createNewNote()
  }
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

      const response = await addNote(userId, requestBody);
      console.log('New note created:', response.note);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };
  return (
    <div>
      <CreateUpdateNote 
        createNote={createNote}
        onChildValueChange={handleChildValueChange}
        onChildValueChange1={handleChildValueChange1}
        onClickBtn={handleClickBtn}
        btnCreateNote={btnCreateNote}
        onColor={handleColor} idNote={0} titleUpdateNote={""} selectedNote={undefined} onClickBtnUpdate={undefined} btnUpdateNote={""} onValueColor={undefined} colorCurrent={undefined} idNumber={undefined}      />
    </div>
  );
};

export default AddNote;
