import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
    idNote: number;
    data: string;
    color: object;
    createAt: string;
    title: string;
}


interface NotesState {
    notes: Note[];
}

const initialState: NotesState = {
    notes: [],
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        getAllNotes: (state, action: PayloadAction<Note[]>) => {
            // Trả về state mới chứa danh sách allNotes từ action payload
            state.notes = action.payload;
        },
    },
});

// Action creators được tạo tự động cho mỗi case reducer function
export const { getAllNotes } = notesSlice.actions;

export default notesSlice.reducer;
