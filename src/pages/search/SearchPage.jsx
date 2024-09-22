import Header from "../../components/UI/header/Header";
import cssClasses from '../PageLayout.module.css';
import SearchComponent from "../../components/search/SearchComponent";
import { clearUserSearchInput } from "../../util/local_storage";
import appStore from "../../store";
import { searchActions } from "../../store/search";

export default function SearchPage(){
    return(
        <div className={cssClasses.layout}>
            <div className={cssClasses.header}>
                <Header 
                    key={'search-header'}
                    headingText={'Cappsule Web Development'}
                />
                <SearchComponent
                    key={'search-page-search-component'}
                />
            </div>
            <div className={cssClasses.search_body}>
                <span className={cssClasses.user_note}>
                   "Find medicines with amazing discounts"
                </span>
            </div>
            <div className={cssClasses.footer}>
                {/* @Cappsule */}
            </div>
        </div>
    )
}

export function searchPageLoader(){
    clearUserSearchInput();
    appStore.dispatch(searchActions.clearUserSearch());
    return null
}