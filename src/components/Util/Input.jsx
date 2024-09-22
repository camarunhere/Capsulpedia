import cssClasses from './Input.module.css';

export default function Input({type, name, ...props}){
    return(
        <div>
            <input 
                type={type}
                name={name}
                className={cssClasses.input}
                {...props}
            />
        </div>
    )
}