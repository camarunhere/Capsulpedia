import { useEffect } from 'react';
import cssClasses from './Button.module.css';

export default function Button({butText, isActive, isAvailable, handleClick}){
   
   let buttonCSS = {}
   if (isAvailable) {
        if (isActive) {
            buttonCSS = cssClasses.selected_button
        }
   } else {
        if (isActive) {
            buttonCSS = cssClasses.selected_dashed_button
        }else{
            buttonCSS = cssClasses.unselected_dashed_button
        }
   }
  
    return(
        <span className={cssClasses.but_container}>
            <button 
                className={buttonCSS}
                onClick={()=>handleClick(butText)}
            >
                {butText ? butText : 'Button'}
            </button>
        </span>
    )
}