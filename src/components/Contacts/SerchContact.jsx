import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

import {Purple} from '../../helpers/colors';

const SearchContact = () =>{
    const {/*contactQuery ,*/ contactSearch} = useContext(ContactContext)

    return(
        <div className="input-group mx-2 w-75" dir="ltr">
        <span className="input-group-text" id="basic-addon1" style={{backgroundColor:Purple}}>
            <i className="fa fa-search"/>
        </span>
        <input dir="rtl" type="text" /*value={contactQuery.text} onChange={contactSearch}*/
        onChange={ (event) => contactSearch(event.target.value)}
        className="form-control" aria-label="search" placeholder="جستجوی مخاطب"
        aria-describedby="basic-addon1"/>
    </div>
    )
}

export default SearchContact;