import { Outlet } from "react-router-dom"
import LeftBar from "./leftBar"

const MainPage: React.FC = () => {

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