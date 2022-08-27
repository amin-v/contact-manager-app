import { useLocation } from "react-router-dom";
import SearchContact from "./Contacts/SerchContact";

import {Purple , Background} from '../helpers/colors';

const Navbar = () =>{
    const location = useLocation();
    
    return(
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
        style={{backgroundColor: Background}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                      <div className="navbar-brand">
                        <i className="fa fa-id-badge" style={{color:Purple}}/>{" "}
                        وب اپلیکیشن مدیریت{" "}
                        <span style={{color: Purple}}>مخاطبین</span>
                     </div>
                    </div>
                    {
                        location.pathname === "/contacts" ? (
                            <div className="col">
                            <SearchContact/>
                           </div>
                        ) : null}
                </div>
            </div>
        </nav> 
    )
}

export default Navbar;