import { Outlet } from "react-router-dom";
import NavDash from "./NavDash";
import UpNavBarDash from "./UpNavBarDash";


const Dashboard = () => {
    return (
        <div>
            <UpNavBarDash />
            <div >
                <NavDash>
                    <Outlet />
                </NavDash>
            </div>
        </div>
    );
};

export default Dashboard;