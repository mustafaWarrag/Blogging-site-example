import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Modal, Box, Button, TextField } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

export default function Contacts(props) {
  let [open, setOpen] = useState(false);
  let navi = useNavigate();
  
  function handleOpening() {
    setOpen(true);
  }
  function handleClosing() {
    setOpen(false);
  };

  useEffect(()=> {
    document.title = "Contact Us"
  },[])

  return (
    <>
    <Container maxWidth={"xl"} sx={{
      height:"89.5vh",
      display:"flex",
      flexDiretction:"column",
      flexWrap:"wrap",
      justifyContent:"center",
      alignContent:"center"
    }}>
      <Paper elevation={2} sx={{
        p:{md:15, xs:10}
        }}>
        <Typography variant="h4">
          Let's Talk
        </Typography>
        <Typography variant="h6" sx={{
          textIndent:{md:"10px", xs:0},
        }}>
          contact me directly at
          
            <Typography component="a" target="_blank"
            href="https://linkedin.com/in/mustafa-warrag-90858a323" 
            title="linkedIn page"
            variant="body1" 
            sx={{
              display:"inline",
              ml:1,
              fontSize:{md:"1.3rem", xs:"1.1rem"},
              fontFamily:"Afacad, sans-serif",
              letterSpacing:"0.15rem",
              color:"secondary.light"
              }}>
                 myLinkedIn Page
            </Typography>
        </Typography>
      </Paper>
      
      {/*
      <Modal 
      open={open} 
      onClose={handleClosing} 
      aria-labelledby='modal-text'
      aria-describedby='modal-desc' 
      sx={{
        display:"flex",
        flexDirection:"column",
        flexWrap:"wrap",
        justifyContent:"center",
        alignContent:"center",
      }}
      >
        
          <Box component="div" id="email-pop-up" sx={{
            display:"flex",
            flexDirection:"column",
            flexWrap:"nowrap",
            justifyContent:"center",
            alignContent:"center",
            textAlign:"center",
            p:15,
            width:"70%",
            //m:10,
            //height:"70%",
            bgcolor:"background.default"
          }}>
            <Button onClick={handleClosing} sx={{
                display:"inline",
                position:"absolute",
                top:"10%",
                right:"16%",
                alignItems:"center",
                pb:0,
                pl:0,pr:0
                //fontSize:"1.3rem"
                }}>
              <CloseRounded component="svg" />
            </Button>
              <Typography id="modal-text" variant="body1">
                Text In A Modal
              </Typography>
              <TextField id="name-field" type="text" label="Your Name" margin="normal" required />
              <TextField id="email-field" type="email" label="Your Email Address" margin="normal" required />
              <TextField id="message-field" type="text" label="message" placeholder='send me a message' required
              margin="normal" multiline minRows={4} helperText="these are placeholder" />
              <br/>
              <Box>
                <Button type='button' onClick={()=>{
                  navi("/contact/done");
                }}
                sx={{
                  bgcolor:"secondary.dark",
                  color:"common.black",
                  width:"40%",
                  
                }}>
                  Send
                </Button>
              </Box>
          </Box>
      </Modal>
      */}

    </Container>
    </>
  )
};