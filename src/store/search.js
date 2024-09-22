import { createSlice } from "@reduxjs/toolkit";

const searchInitialState = {
    search : {
        userSearchInput: localStorage.getItem('currentUserSearch') || '',
    },

}

const searchSlice = createSlice({
    name: 'search',
    initialState : searchInitialState,
    reducers: {
        setUserSearch(state, action){
            state.search.userSearchInput = action.payload.userSearchInput;
        },
        clearUserSearch(state){
            state.search.userSearchInput = '';
        },
        
    }
})

const searchReducers = searchSlice.reducer;
export const searchActions = searchSlice.actions;

export default searchReducers;