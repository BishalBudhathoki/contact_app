import './App.css';
import React, {useState, useEffect} from 'react'
import {Card} from "react-bootstrap";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Icon from 'react-bootstrap-icons';
import profileImg from './user.png';


/**
 * Address is an object with a street property that is a string, a suite property that is a string, a city property that is
 * a string, and a zipcode property that is a string.
 * @property {string} street - The street address of the user.
 * @property {string} suite - The suite number of the address.
 * @property {string} city - The city where the address is located.
 * @property {string} zipcode - string;
 */
type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

/**
 * Company is an object with a bs property that is a string.
 * @property {string} bs - The company's "catch phrase"
 */
type Company = {
    bs: string;
}

/**
 * A Contact is an object with a name, email, username, phone, address, website, and company.
 * @property {string} name - The name of the contact.
 * @property {string} email - The email address of the contact.
 * @property {string} username - The username of the contact.
 * @property {string} phone - The phone number of the contact.
 * @property {Address} address - This is an object that contains the street, suite, city, zipcode, and geo properties.
 * @property {string} website - The website of the contact.
 * @property {Company} company - This is an object that contains the name of the company, the catch phrase, and the
 * business.
 */
type Contact = {
    name: string;
    email: string;
    username: string;
    phone: string;
    address: Address;
    website: string;
    company: Company;
}


/* This is the main component that is being rendered. */
export default function App() {
    /* This is a hook that is used to set the state of the component. */
    const [open, setOpen] = React.useState(false);
    const [contacts, setContacts] = React.useState<Array<Contact>>([]);
    const [selectedContact, setSelectedContact] = useState<Contact>();

  /* This is a hook that is used to set the state of the component and load json data
  * from the server*/
  React.useEffect(() => {
    const fetchUserDetails = async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => {
            setContacts(data);
            console.log(data);
          });
    };
    fetchUserDetails();
  }, []);

    /**
     * When the user clicks on a contact, set the selected contact to the contact that was clicked on, and open the dialog.
     * @param {Contact} contact - Contact - this is the contact that was clicked on.
     */
    const handleClickOpen = (contact: Contact) => {
        setSelectedContact(contact)
        setOpen(true);
    };

    /**
     * The handleClose function sets the open state to false hence close dialog
     * if select a specific button or outside scope
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * It returns a list of cards with the contact name and an info icon.
     * @returns A list of cards with the contact name and an info icon.
     */
    const getContactCards = () => {
      return contacts.map((contact: Contact, index) => {
          console.log(contact)
          return(
              <Card className="mb-2">
                 <Card.Header >
                     <h3 className="contactNameHeading">{contact.name}
                         <div >
                             <div className="position-absolute top-50 start-100 translate-middle">
                                 <Icon.InfoCircleFill size={25} onClick={()=>handleClickOpen(contact)}/>
                             </div>
                         </div>
                     </h3>
                       {/*<Button onClick={()=>handleClickOpen(contact)}>More</Button>*/}
                 </Card.Header>
              </Card>
          )
      })
   }

    /* A function that returns a div with the current year and a link to my portfolio. */
    const FooterPage = () => {
        return (
            <div>
                &copy; {new Date().getFullYear()} Portfolio:
                <a href="https://www.bishalbudhathoki.me" target="_blank"
                   style={{color: "greenyellow"}} rel="noreferrer"> BishalBudhathoki.me </a>
            </div>
        )
    };

    /* This is the main component that is being rendered. */
    return (
      <div className="App">
         {/*This is a bootstrap grid system that is used to center the text. */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="animate-character">
                          Contacts
                        </p>
                    </div>
                </div>
            </div>

           {/*Calling the getContactCards() and FooterPage() function. */}
          { getContactCards()}
          { FooterPage() }

           {/*This is a dialog box that is used to display the contact information. */}
          <Dialog
              BackdropProps={{ invisible: true }}
              className="dialogBox"
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                  style: {
                      backgroundColor: "#ff9a3c",
                  },
              }}
          >
              <DialogTitle id="alert-dialog-title" >
                  <img id="profile" src={profileImg} alt="Profile" width="120" height="120"/>
                  <p style={{color: "#155263", marginLeft: "90px"}}><b><u>{selectedContact?.name}</u></b></p>

              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">

                      <div className="contacts" style={{color: "#bc2525"}}>
                          <div><p ><b>Name:</b> {selectedContact?.name} </p></div>
                          <div><p><b>Email:</b>
                              <a href="mailto:{selectedContact?.email} " style={{color: "#bc2525"}}>
                                  {selectedContact?.email}
                              </a>
                          </p></div>
                          <div><p><b>Phone:</b>
                              <a href="tel:{selectedContact?.phone}" style={{color: "#bc2525"}}>
                                  {selectedContact?.phone}</a>
                          </p></div>
                          <div><p><b>Address:</b> {`${selectedContact?.address.street}, 
                          ${selectedContact?.address.suite}, ${selectedContact?.address.zipcode}`}</p></div>
                          <div><p><b>Website:</b>
                              <a href= {selectedContact?.website} target="_blank" rel="noreferrer" style={{color: "#bc2525"}}>
                                {selectedContact?.website}
                              </a>
                          </p></div>
                      </div>
                  </DialogContentText>
              </DialogContent>
              <DialogActions>

                  <Button onClick={handleClose} autoFocus>
                      Close
                  </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
}

