import { RouterProvider } from "react-router-dom";
import appRouter from "./router";
import { useSelector } from "react-redux";
import FlashMessage from "./components/UI/flash_message/FlashMessage";
import Loader from "./components/UI/loader/Loader";

export default function App() {
  const flash = useSelector(state => state.ui.flash);
  const loader = useSelector(state => state.ui.loader);

  return (
    <>
      {flash.isVisible && <FlashMessage message={flash.message}/>}
      {loader.isLoading && <Loader/>}
      <RouterProvider router={appRouter}/>
    </>
  )
}
