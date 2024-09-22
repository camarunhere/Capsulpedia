import { json } from "react-router-dom";
import appStore from "../store";
import { uiActions } from "../store/ui";

export async function fetchData({url}){
    
    let response;

    //For Loader gif Purpose

    appStore.dispatch(uiActions.startLoading());
    try {
        response = await fetch(url);
    } catch (error) {
        appStore.dispatch(uiActions.stopLoading());
        throw json(
            {
                message: error.message || 'Unable to fetch data, Try Again'
            },
            {
                status: 500
            }
        )
    }

    if (!response.ok) {
        appStore.dispatch(uiActions.stopLoading());
        throw json(
            {
                message: 'Unable to fetch data, Try Again'
            },
            {
                status: 500
            }
        )
    }else if(response === null){
        appStore.dispatch(uiActions.stopLoading());
        throw json(
            {
            message: 'No data found!'
            },
            {
                status:404
            }
        )
    }

    const resData = await response.json();

    //For Loader gif Purpose
    appStore.dispatch(uiActions.stopLoading());
    return resData;
}