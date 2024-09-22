//Redux
import { configureStore } from "@reduxjs/toolkit";

//Reducers
import uiReducers from "./ui";
import searchReducers from "./search";

const appStore = configureStore(
    {
        reducer: {
            ui : uiReducers,
            search : searchReducers,
        }
    }
)

export default appStore;