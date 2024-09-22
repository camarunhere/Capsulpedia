import cssClasses from './SearchComponent.module.css';
import searchIcon from '../../assets/icons/icons8-search-64.png';
import backArrowIcon from '../../assets/icons/icons8-back-arrow-48.png';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/search';
import { useNavigate } from 'react-router-dom';
import { setUserSearchInputLocally } from '../../util/local_storage';

export default function SearchComponent({existingUserInput}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSearchSubmit(event){
        event.preventDefault();

        //Get user search form data
        const rawFD = new FormData(event.target);
        const userSearchData = Object.fromEntries(rawFD.entries());
        // console.log(userSearchData, 'user search input from search component');

        //Store user search data
        dispatch(searchActions.setUserSearch({userSearchInput : userSearchData.user_search_input}));
        setUserSearchInputLocally(userSearchData.user_search_input);
        
        navigate('/searchResults');
    }

    return(
        <form onSubmit={handleSearchSubmit} className={cssClasses.search_form}>
            <div className={cssClasses.form_input_block}>
                {
                    existingUserInput ?
                    <img
                        src={backArrowIcon}
                        alt="back arrow icon"
                        // width={30}
                        // height={30}
                        onClick={()=>navigate('/search')}
                        style={{cursor:'pointer'}}
                    />
                    :
                    <img
                        src={searchIcon}
                        alt=" icon"
                        // width={30}
                        // height={30}
                    />

                }
                
                <input
                    type="text"
                    name="user_search_input"
                    placeholder="Type medicine name"
                    className={cssClasses.search_input}
                    defaultValue={existingUserInput ? existingUserInput : ''}
                />
            </div>
            <button className={cssClasses.form_submit_but}>
                Search
            </button>
        </form>
    )
}