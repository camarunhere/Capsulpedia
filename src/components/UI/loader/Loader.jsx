//React
import { createPortal } from "react-dom"

//Styles & Gifs
import loadingGif from '../../../assets/gifs/loading-7528_256.gif';
import cssClasses from './Loader.module.css';

export default function Loader(){
    return createPortal(
        <dialog 
            open
            className={cssClasses.loader}
        >   
            <div>
                <img 
                    src={loadingGif} 
                    alt="loading Gif" 
                    className={cssClasses.loaderGif}
                />
                {/* <p>{'Loading...'}</p> */}
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}