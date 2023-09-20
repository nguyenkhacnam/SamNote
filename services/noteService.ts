import axiosConfig from './axiosConfig';

interface NoteData {
  title: string;
  data: string;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  idFolder?: string | null;
  dueAt?: Date | null;
  remindAt?: Date | null;
  lock?: string | null;
  notePublic?: number;
  pinned: boolean;
  share?: string | null;
  type: string;
}

export const addNote = async (idUser: number, data: any) => {
  try {
    const res = await axiosConfig.post(`/notes/${idUser}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (idNote: number, data: any) => {
  try {
    const res = await axiosConfig.patch(`/notes/${idNote}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNoteOnTrash = async (idNote: number) => {
  try {
    const res = await axiosConfig.delete(`/notes/${idNote}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};
