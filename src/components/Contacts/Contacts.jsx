import {Pink , CurrentLine , Orange} from '../../helpers/colors'
import Contact from "./Contact";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Contacts = () =>{
    const {loading , deleteContact , filteredContacts } = useContext(ContactContext)
    return(
        <>
        <section className="container">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3">
                            <Link to={"/contacts/add"} className="btn mx-2" style={{backgroundColor:Pink}}>
                                ساخت مخاطب جدید
                                <i className="fa fa-plus-circle mx-2"></i>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        {
           loading ? <Spinner/> :  (

            <section className="container">
            <div className="row">
                {
                    filteredContacts.length > 0 ? filteredContacts.map((c) => 
                        <Contact key={c.id} deleteContact={() =>    //az arrowfunction chon mikham meqdar bedam
                            deleteContact(c.id , c.fullname)}        //confirmDelete meqdar dehi shod ba id , fullname sh va be onvan prop ferstad be contact
                            contact={c} />
                    ) : (
                        <div className="text-center py-5" style={{backgroundColor: CurrentLine}}>
                            <p className="h3" style={{color:Orange}}>
                                مخاطب یافت نشد....
                            </p>
                           <img src={require("../../assets/no-found.gif")} alt="پیدا نشد" className="w-25"/>
                        </div>
                    )
                }
                
            </div>
        </section>
           )
        }

        </>
    )
}

export default Contacts;