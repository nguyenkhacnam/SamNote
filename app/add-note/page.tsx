"use client";
import NewNote from "@/components/NewNote/NewNote";
import UpdateNote from "@/components/UpdateNote/UpdateNote";
import axios from "axios";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

interface AddNoteProps {
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  },
  user: {
    id: number;
    name: string;
  },
 }

const AddNote: FC<AddNoteProps> = ({ }) => {
  const userData: any = useSelector((state: any) => state.user)
  const userId: number | undefined = userData?.id
  const initialColor = {
    r: 254,
    g: 245,
    b: 203,
    a: 1,
  }
  const createNote: string = 'Create Notesdfsadfsda'
  // const [currentColor, setCurrentColor] = useState('#FEF5CB')
  // const [titleTextColor, setTitleTextColor] = useState('text-[#000000]');
  const [valueTitle, setValueTitle] = useState<string>('')
  const [valueContents, setValueContents] = useState('')
  const [color, setColor] = useState<AddNoteProps['color']>(initialColor)
  const [idFolder, setIdFolder] = useState(null)
  const [dueAt, setDueAt] = useState(null)
  const [remindAt, setRemindAt] = useState(null)
  const [lock, setLock] = useState(null)
  const [notePublic, setNotePublic] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [share, setShare] = useState(null)
  const [type, setType] = useState('text')
  // const [updateAt, setUpdateAt] = useState('')
  // const [isNoteEdited, setIsNoteEdited] = useState(false);
  // const [activeIcon, setActiveIcon] = useState(null);
  // const [outputList, setOutputList] = useState([]);
  // const [isVisible, setIsVisible] = useState(true)

  const handleChildValueChange = (title: string, contents: string) => {
    setValueTitle(title);
    setValueContents(contents)
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
      // setUpdateAt(updateAt)
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };
  return (
    <div>
      {/* <NewNote 
        createNote={createNote} user={{
          id: 0,
          name: ""
        }} color={{
          r: 0,
          g: 0,
          b: 0,
          a: 0
        }}      /> */}
      <UpdateNote 
        createNote={createNote}
        onChildValueChange={handleChildValueChange}
      />
    </div>
  );
};

export default AddNote;
