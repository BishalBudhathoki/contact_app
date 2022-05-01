import './App.css';
import React, {useState, useEffect} from 'react'
import {Card} from "react-bootstrap";
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Icon from 'react-bootstrap-icons';
import profileImg from './user.png';


type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}
type Company = {
    bs: string;
}
type Contact = {
    name: string;
    email: string;
    username: string;
    phone: string;
    address: Address;
    website: string;
    company: Company;
}


export default function App() {
    const [open, setOpen] = React.useState(false);
    const [contacts, setContacts] = React.useState<Array<Contact>>([]);
    const [selectedContact, setSelectedContact] = useState<Contact>();


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

    const handleClickOpen = (contact: Contact) => {
        setSelectedContact(contact)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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



    if(!contacts.length) {
        return(
            <Box className="Box" sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    const FooterPage = () => {
        return (
            <div>
                &copy; {new Date().getFullYear()} Portfolio:
                <a href="https://www.bishalbudhathoki.me"
                   style={{color: "greenyellow"}}> BishalBudhathoki.me </a>
            </div>
        )};



    return (
      <div className="App">
          {/*<a href="displayContacts.tsx" >*/}
              <div className="container">
                  <div className="row">
                      <div className="col-md-12 text-center">
                          <p className="animate-charcter">
                              Contacts
                          </p>
                      </div>
                  </div>
              </div>
          {/*</a>*/}

          { getContactCards()}
          { FooterPage() }
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
                          <div><p><b>Email:</b> <a href="mailto:{selectedContact?.email} " style={{color: "#bc2525"}}> {selectedContact?.email}</a></p></div>
                          <div><p><b>Phone:</b> <a href="tel:{selectedContact?.phone}" style={{color: "#bc2525"}}>{selectedContact?.phone}</a></p></div>
                          <div><p><b>Address:</b> {`${selectedContact?.address.street}, ${selectedContact?.address.suite}, ${selectedContact?.address.zipcode}`}</p></div>
                          <div><p><b>Website:</b> <a href={selectedContact?.website} style={{color: "#bc2525"}}> {selectedContact?.website}</a></p></div>
                          {/*<div id="box"><p style={{display: "inline"}}><b>Company:</b><p id="company"> {selectedContact?.company.bs} </p></p></div>*/}
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

