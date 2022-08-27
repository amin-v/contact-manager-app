
import { useEffect } from 'react';
import {Routes , Route , Navigate , useNavigate} from "react-router-dom";  //navigate componnet useNavigate vs mitoonim mostaqim aslan az in estefade konim
import { getAllContacts , getAllGroups ,createContact, deleteContact } from './servises/contactService';
import {confirmAlert} from "react-confirm-alert";
import _ from "lodash"

import './App.css';
 
import {AddContact , EditContact , ViewContact , Contacts , Navbar } from "./components"
import { Purple , CurrentLine , Yellow , Foreground, Comment} from './helpers/colors';
import { ContactContext } from './context/contactContext';
import { useImmer } from 'use-immer';
import { ToastContainer,toast } from 'react-toastify';


/*********************************************************************************************************** */

const App = () => {

  const [contacts , setContacts] = useImmer([])
  const [groups , setGroups] = useImmer([])
  const [loading , setLoading] = useImmer(false)
  const [filteredContacts , setFilteredContacts] = useImmer([]);
  const navigate = useNavigate();

/*********************************************************************************************************** */

  useEffect(() =>{                  // tabe asli ro nemishe async kard bekhatere hamin payin yedoone async misazim va dakhelsesh codemoon ro minevisim
  const fetchDate = async () => {
   try{
     setLoading(true);               // ta data biyad az server shayad chan sec tool bekeshe 
     const {data:contactsData} = await getAllContacts();
     const {data:groupsData} = await getAllGroups();
     setContacts(contactsData);
     setFilteredContacts(contactsData);
     setGroups(groupsData);
     setLoading(false); 
     
   }catch(err){
     console.log(err.message);
     setLoading(false)
   }
  };
     fetchDate();
  }, [])                           //[]= tanaha zamani load mishi ke component sakhte shod

/************************************************************************************************************* */

  const createContactForm =async (values) => {
    try{
      setLoading(draft => !draft);              // inja true bashe
      
      const {status , data} = await createContact(values);  //ba setContact meqdar dehi shode mokhate hala ba getContact(contact) mikhaym sakhte beshe va ezafe she
      
      if(status ===201){                               // MOTMAEN beshim mokhate sakhte shode
        toast.success("مخاطب با موفقیت ساخته شد",{icon:"🧛"})
        setContacts(draft => {draft.push(data) })     //draft meqdaresh barabar ba state contacts hast , tamami contacts daroon draft hast va ba push data jadid ro behesh ezafe mikonim
        setFilteredContacts(draft => {draft.push(data) })

        setLoading((prevLoading) => !prevLoading)    //loading har chi bood bar aksesh kon
        navigate("/contacts")                         // hala ke sakhte shod boro be in safhe
      }
      }catch(err){
        console.log(err.message);
        setLoading((prevLoading) => !prevLoading)
    }}

//******************************************************************************************************** */

  const confirmDelete = (contactId , contactFullname) => {    // baraye yes/no delete
    confirmAlert({
      customUI: ({onClose}) => {
       return(
        <div dir='rtl' style={{backgroundColor: CurrentLine , border: `1px solid ${Purple}` , borderRadius: "1em"}} className="p-4">
          <h1 style={{color: Yellow}}> پاک کردن مخاطب</h1>
          <p style={{color:Foreground}}>مطمینی که میخوای مخاطب {contactFullname} رو پاک کنی؟</p>
          <button onClick={() => {                                // arrowfunction neveshtim chon nemikhaym poshte parde ejra beshe va zamani ke man goftam ejt=ra beshe
              removeContact(contactId);
              onClose();                                          //on close ro seda mizanim ta vaghti amaliyat anjam shod confirm dialog baste beshe
          }} className="btn , mx-2" style={{backgroundColor:Purple}}>مطمین هستم</button>
          <button onClick={onClose} className="btn" style={{backgroundColor:Comment}}>انصراف</button>
        </div>
       ) 
      }
    })
  }

//********************************************************************************************************** */
 
const removeContact = async (contactId) => {

      /* Delete State Before Server Request (estefade az in/) */
      //contacts copy
       const contactsBackup = [...contacts];
    try{

      setContacts((draft) => draft.filter(c => c.id !== contactId))          // hame contact ha be qeyr az ooni ke id sh barbar ba id ke man behet dadam ro bargasht bede beriz to updatecontact
      setFilteredContacts((draft) => draft.filter(c => c.id !== contactId))

      // Sending delete request to serve
      const {status} = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت حذف شد",{icon:"🙍🏻"})
      if(status !==200){
      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup);         
      }     
    }catch(err){
      console.log(err.message);
      setContacts(contactsBackup);
      setFilteredContacts(contactsBackup); 
      
    }
  }
  
/************************************************************************************************************ */

  /*const contactSearch = (event) => {
      setContactQuery({...contactQuery , text: event.target.value});             //har chi neveshte shod biyad ezafe she be text
      const allContacts = contacts.filter((contact) => {                        //oomadim tamam mokhatabein ke be soorate araye dar getcontacts hast ro gerftim va ba filter goftim har kodoom az contact ha ro begir,filter araye jadid mide
        return contact.fullname.toLowerCase()
        .includes(event.target.value.toLowerCase());                            //mokhatabini ke fullnameshoon havi charchteri bashe ke tooye search neveshte bargasht bedetoo araye jadid ke moshahede konim
      });
      setFilteredContacts(allContacts); 
  }*/
// refactor shode baraye dobounce kardan


  const contactSearch = _.debounce(query => {

    if(!query) return setFilteredContacts([...contacts]);                 ///agar query nabood bargasht bede hame mokhatabin ro
   
    setFilteredContacts((draft) => draft.filter((c) => c.fullname.toLowerCase().includes(query.toLowerCase())))
  },1000)

/*********************************************************************************************************** */

  return (
    <ContactContext.Provider value={{                                        //agar key va value yeki bood mitoonim name yekishoon ro benevisim
      loading , setLoading , setContacts , contacts , filteredContacts , groups ,deleteContact: confirmDelete ,
      createContact: createContactForm , contactSearch , setFilteredContacts}}>
    <div className="App">

      <ToastContainer rtl={true} position="top-right" theme='colored'/>      
      <Navbar/>                                                               {/*query ro ham ferstadim chon bayad inputsearch ro ham dahte bashim */}
      <Routes>
        <Route path='/' element={<Navigate to="/Contacts"/>}/>                 {/*migim ke vaghti patch localhost miri ye bare ba navigate boro safhe contacts na localhost khali  */}
        <Route path='/Contacts' element={<Contacts/>}/>
        <Route path='/Contacts/add' element={<AddContact/>}/>
       <Route path='/Contacts/:contactId' element={<ViewContact/>}/>
        <Route path='/Contacts/edit/:contactId' element={<EditContact />}/>
      </Routes>
    </div>
    </ContactContext.Provider>
  );
};

export default App;
