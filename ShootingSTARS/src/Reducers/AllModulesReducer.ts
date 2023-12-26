import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Module } from '../Types/Module';

export interface AllModulesState { 
    allModules: Module[];
}

const initialState: AllModulesState = { 
    allModules: []
};

export const allModulesSlice = createSlice({
    name: 'allModules',
    initialState,
    reducers: {
        setModules : (state, action: PayloadAction<Module[]>) => {
            state.allModules = action.payload;
            console.log(state.allModules);
        }
    }
});

export const { setModules } = allModulesSlice.actions;
export const getAllModules = (state: RootState):Module[] => state.allModules.allModules;

export default allModulesSlice.reducer;