import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
    flash : {
        isVisible : false,
        type : '',
        message : '',
    },
    loader : {
        isLoading : false,
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState : uiInitialState,
    reducers: {
        triggerFlash(state, action){
            state.flash.isVisible = true
            state.flash.type = action.payload.type
            state.flash.message = action.payload.message
        },
        removeFlash(state){
            state.flash.isVisible = false
            state.flash.type = ''
            state.flash.message = ''
        },
        startLoading(state){
            state.loader.isLoading = true
        },
        stopLoading(state){
            state.loader.isLoading = false
        }
    }
})

const uiReducers = uiSlice.reducer;
export const uiActions = uiSlice.actions;

export default uiReducers;