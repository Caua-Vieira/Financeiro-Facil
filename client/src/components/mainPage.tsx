import { Outlet } from "react-router-dom"
import LeftBar from "./leftBar"

function MainPage() {

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