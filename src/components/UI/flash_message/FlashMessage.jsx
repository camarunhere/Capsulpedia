//React
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui";

//Styles & Images
import cssClasses from './FlashMessage.module.css';


export default function FlashMessage({message, ...props}){
    //Redux
    const dispatch = useDispatch();
    const flashType = useSelector(state => state.ui.flash.type);

    const dialogRef = useRef();
    // console.log('flashmessage')

    function onCloseFlash(){
        dispatch(uiActions.removeFlash())
        dialogRef.current?.close()
    }

    let dialog_bcolor = 'white'
    let color = 'black'

    if (flashType === 'success') {
        dialog_bcolor = 'rgb(210 225 133)' 
    } else if (flashType === 'warning'){
        dialog_bcolor = '#cb4242' //red
        color = 'white'
    } else if (flashType === 'info'){
        dialog_bcolor = 'orange'
    }

    useEffect(()=>{
        setTimeout(()=>{
            onCloseFlash();
        }, 4*1000)
    },[onCloseFlash])

    return createPortal(
        <dialog 
            ref={dialogRef}
            className={cssClasses.flash_modal}
            style={{backgroundColor:dialog_bcolor, color:color, ...props}}
            open
        >   
            <div className={cssClasses.content_block}>
                <span className={cssClasses.content}>
                    {message}
                </span>
                <span className={cssClasses.closeBut} 
                   onClick={onCloseFlash}
                >
                    x
                </span>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}