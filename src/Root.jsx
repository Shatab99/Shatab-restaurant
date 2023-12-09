import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Home/Navbar";


const Root = () => {
    return (
        <div>
            <Navbar>
                <Outlet />
                <Footer />
            </Navbar>
        </div>
    );
};

export default Root;