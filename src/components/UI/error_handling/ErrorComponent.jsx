//React
import { useEffect, useRef } from 'react';

//Router
import { useRouteError, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

//Styles & Images
import classes from './ErrorComponent.module.css';

export default function ErrorComponent() {
  const dialog = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    dialog.current.showModal();
    // return()=>{
    //   dialog.current.close();
    // };
  },[])

  const error = useRouteError();

  let title = 'An error occurred!';
  // let message = 'Something went wrong!'
  let message = (error && error.data.message) || 'Something went wrong!'

  if (error.status === 500) {
    message = error.data.message;
  }
  
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  if (error.status === 401) {
    message = 'Unauthorized error';
  }

  if (message === 'Failed to fetch') {
    message += ', Enter a valid domain/path'
  }
  
  return createPortal(
    <dialog ref={dialog} className={classes.error_modal}>
      <span className={classes.error_heading}>{title}</span>
      <p>{message}</p>
      <div className={classes.action_butns}>
       <button onClick={()=>navigate(-1)}>Go Back</button>
      </div>
      
    </dialog>,
    document.getElementById('modal')
  );
}


