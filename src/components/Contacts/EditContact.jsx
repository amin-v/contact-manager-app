/* eslint-disable jsx-a11y/alt-text */
import { useEffect , useContext} from "react";
import { ContactContext } from "../../context/contactContext";
import {Spinner} from "../";
import { useParams , useNavigate , Link } from "react-router-dom";
import { getContact , updateContact } from "../../servises/contactService";
import { Comment , Purple , Green } from "../../helpers/colors";
import { Formik , Form , Field , ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';

const EditContact = () => {
    const {contactId} = useParams();
    const navigate = useNavigate()
    const [contact, setContact] = useImmer({});
    
    const {loading , setLoading , groups , setFilteredContacts} = useContext(ContactContext)

    useEffect(() =>{
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: contactData} = await getContact(contactId);
                setLoading(false)
                setContact(contactData)
            }catch(err){
                console.log(err);
                setLoading(false)

            }
        };
        fetchData();
    },[]);

          /* Update local state (inja in use shod)*/

    const submitForm = async (values) => {
        try{
            setLoading(true)
            const {data , status} = await updateContact(values , contactId);

            if(status===200){
              setLoading(false)
              toast.info("مخاطب با موفقیت ویرایش شد",{icon:"🤞🏻"})
              
              setContact(draft =>{
                const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId))          //  ye halghe mizane baste be sharti ke besh dadim index oon eleman ro bargasht mide. contact id az useparams miyad
                draft[contactIndex] = {...data}   //barabar badata ke az server migiram
              })
              
              setFilteredContacts(draft =>{
                const contactIndex = draft.findIndex((c) => c.id === parseInt(contactId))          //  ye halghe mizane baste be sharti ke besh dadim index oon eleman ro bargasht mide. contact id az useparams miyad
                draft[contactIndex] = {...data}   //barabar badata ke az server migiram
              });

              navigate("/contacts");
            }
        }catch(err){
                console.log(err);
                setLoading(false)
              }
        }
    
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <section className="p-3">
              <div className="container">
                <div className="row my-2">
                  <div className="col text-center">
                    <p className="h4 fw-bold" style={{ color: Green }}>
                      ویرایش مخاطب
                    </p>
                  </div>
                </div>
                <hr style={{ backgroundColor: Green }} />
                <div
                  className="row p-2 w-75 mx-auto align-items-center"
                  style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                >
                  <div className="col-md-8">

                  <Formik
                            initialValues={contact}
                            validationSchema= {contactSchema}
                            onSubmit= {(values) => {
                            submitForm(values)
                            }}>
                                <Form>
                                <div className="mb-2">
                                    <Field name="fullname" type="text" className="form-control" placeholder=" نام و نام خوانوادگی"/>
                                    <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field name="photo" type="text" className="form-control" placeholder=" آدرس تصویر"/>
                                    <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field name="mobile" type="number" className="form-control" placeholder=" شماره موبایل "/>
                                    <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field name="email" type="email" className="form-control" placeholder=" آدرس ایمیل"/>
                                    <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field name="job" type="text" className="form-control" placeholder=" شغل"/>
                                </div>
                                <div className="mb-2">
                                    <Field name="group" as="select" className="form-control">
                                       <option value="">انتخاب گروه</option>
                                       {groups.length > 0 && groups.map((group) => (
                                          <option key={group.id} value={group.id}>
                                            {group.name}
                                          </option>  
                                       ))}
                                    </Field>
                                    <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>}/> 
                                 </div>
                                <div className="mx-2">
                                    <input
                                    type="submit" className="btn" style={{backgroundColor: Purple }} value=" ویرایش مخاطب"/>
                                    <Link to={"/contacts"} className="btn mx-2" style={{backgroundColor: Comment }}> انصراف</Link>
                                </div>
                            </Form>
                          </Formik>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={contact.photo}
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${Purple}` }}
                    />
                  </div>
                </div>
              </div>
  
              <div className="text-center mt-2">
                <img
                  src={require("../../assets/man-taking-note.png")}
                  height="300px"
                  style={{ opacity: "60%" }}
                />
              </div>
            </section>
          </>
        )}
      </>
    );}

export default EditContact;