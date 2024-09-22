//Styles & Assests
import cssClasses from './Header.module.css';

export default function Header({headingText, ...props}){
    return(
        <header className={cssClasses.search_heading} {...props}>
            <span>
                {headingText ? headingText : 'Heading'}
            </span>
        </header>
    )
}