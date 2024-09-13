import { Outlet } from "react-router-dom"
import LeftBar from "./leftBar"

const MainPage = (): JSX.Element => {

    return (
        <>
            <LeftBar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage