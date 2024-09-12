import { Outlet } from "react-router-dom"
import LeftBar from "./leftBar"

const MainPage = (): JSX.Element => {

    return (
        <>
            <LeftBar />
            <div className="content-page">
                <Outlet />
            </div>
        </>
    )
}

export default MainPage