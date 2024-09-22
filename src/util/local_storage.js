export function setUserSearchInputLocally(value){
    localStorage.setItem('currentUserSearch', value);
}

export function getLocalUserSearchInput(){
    return localStorage.getItem('currentUserSearch');
}

export function clearUserSearchInput(){
    localStorage.removeItem('currentUserSearch');
}