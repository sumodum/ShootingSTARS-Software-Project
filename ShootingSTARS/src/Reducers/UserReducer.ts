import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface userState { 
    username : string
    
}

const initialState: userState = { 
    username : ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
        logout : (state) => { 
            state.username = '';
        },

        login: (state,action:PayloadAction<string>) => { 
            state.username = action.payload;
        }
    }
});
export const {login,logout} = userSlice.actions;
export const selectUsername = (state: RootState): string => state.user.username;
export default userSlice.reducer;