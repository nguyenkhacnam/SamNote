import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Avarta: '',
    AvtProfile: '',
    gmail: '',
    id: '',
    name: '',
    jwt: '',
    
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { Avarta = '', AvtProfile = '', gmail = '', id = '', name = '', jwt = ''} = action.payload
            state.Avarta = Avarta;
            state.AvtProfile = AvtProfile;
            state.gmail = gmail;
             state.id = id;
            state.name = name;
            state.jwt = jwt;
        },
            
        resetUser: (state) => {
          


        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer