//Redux
import appStore from "../store"

function getSearchState() {
    return appStore.getState().search;
}

export function capsuleSearchAPIPath(){
    const searchState =  getSearchState();
    return `https://backend.cappsule.co.in/api/v1/new_search?q=${searchState.search.userSearchInput}&pharmacyIds=1,2,3`;
}

