import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

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

    </Container>
    </>
  )
};