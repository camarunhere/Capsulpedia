import { redirect, useRouteLoaderData } from "react-router-dom"
import { fetchData } from "../../util/http_requests";
import { capsuleSearchAPIPath } from "../../util/api_paths_generator";
import cssClasses from '../PageLayout.module.css';
import Header from "../../components/UI/header/Header";
import SearchComponent from "../../components/search/SearchComponent";
import { useSelector } from "react-redux";
import ResultCard from "../../components/results/ResultCard";
import appStore from "../../store";
import { uiActions } from "../../store/ui";

export default function ResultsPage(){
    const saltSuggestions = useRouteLoaderData('results-route').data.saltSuggestions;
    const existingUserInput = useSelector((state)=>state.search.search.userSearchInput);

    return(
        <div className={cssClasses.layout}>
            <div className={cssClasses.header}>
                <Header 
                    key={'results-header'}
                    headingText={'Cappsule Web Development'}
                />
                <SearchComponent 
                    key={'result-page-search-component'}
                    existingUserInput={existingUserInput}
                />
            </div>
            <div className={cssClasses.result_body}>
                {saltSuggestions.map((saltObj)=>(
                    <ResultCard 
                        key={saltObj.id}
                        saltObj={saltObj}
                    />
                ))}
            </div>
            <div className={cssClasses.footer}>
                {/* footer */}
            </div>
        </div>
       
    )
}

export async function getResultsLoader(){
    const searchResults = await fetchData({url: capsuleSearchAPIPath()});
    // console.log(searchResults, 'search results from search component');
    
    if (!searchResults || searchResults.data.saltSuggestions.length === 0) {
        appStore.dispatch(uiActions.triggerFlash(
            {
                type:'info',
                message: 'Search a valid salt'
            }
        ))
        return redirect('/search');
    }

    return searchResults;
}

