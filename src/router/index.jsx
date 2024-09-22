import { createBrowserRouter, redirect } from "react-router-dom";
import SearchPage, {searchPageLoader} from "../pages/search/SearchPage";
import ResultsPage, { getResultsLoader } from "../pages/results/ResultsPage";
import ErrorComponent from "../components/UI/error_handling/ErrorComponent";

const appRouter = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorComponent/>,
        loader: ()=>redirect('/search')
    },
    {
        path: '/search',
        id:'search-route',
        element: <SearchPage/>,
        errorElement: <ErrorComponent/>,
        loader: searchPageLoader,
    },
    {
        path:'/searchResults',
        id:'results-route',
        element:<ResultsPage/>,
        errorElement: <ErrorComponent/>,
        loader: getResultsLoader,
    }
])

export default appRouter;