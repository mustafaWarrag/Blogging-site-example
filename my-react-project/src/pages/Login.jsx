import { CloseRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../features/userSlice.js";

import userRequests from "../requests/userRequests.js";

export default function Login(props) {
    //let [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = useSelector((store)=> store.info.username);
    const token = useSelector((store) => store.info.token)
    let dispatch = useDispatch();
    
    let navi = useNavigate();
    
    function handleInputs(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setInputs((values) => ({...values, [nam]:val}))
    }

    function handleOpening() {
        props.setOpen(true);
    }
    function handleClosing() {
        props.setOpen(false);
    }

    function handleDispatching(username, token) {
      dispatch(setUser({
        username:username,
        token:token
      }));
      localStorage.setItem("cookie", JSON.stringify({username:username, token:token}));
      setTimeout(()=> console.log(user + " token: " + token), "1000");
    }

    //let token = "placeholder";

    function loginUser() {
      let data = {
        username:inputs.username,
        password:inputs.password,
        email:inputs.email
      }
      setError(false);

      userRequests.signUser(data).then((response) => {
        console.log("logged in successfully");
        console.log(response.data);
        handleDispatching(data.username, response.data.token)
        handleClosing();
        setLoading(false);
      }).catch((err) => {
        console.error("unable to login " + err);
        setError(true)
        setLoading(false);
      })
    }
    

    return (
        <>
            <Modal 
            open={props.open} 
            onClose={handleClosing} 
            aria-labelledby='modal-text'
            aria-describedby='modal-desc' 
            disableScrollLock
            sx={{
                display:"flex",
                flexDirection:"column", flexWrap:"wrap",
                justifyContent:"center", alignContent:"center"
              }}>
          <Box component="div" id="email-pop-up" sx={{
            display:"flex",
            flexDirection:"column", flexWrap:"nowrap",
            justifyContent:"center", alignContent:"center",
            textAlign:"center",
            p:{md:15, xs:5},
            width:{md:"70%", xs:"85%"},
            bgcolor:"background.default"
          }}>
            <Button onClick={handleClosing} sx={{
                display:"inline",
                position:"absolute",
                top:{md:"15%", xs:"17%"},
                right:{md:"16%", xs:"10%"},
                alignItems:"center",
                pb:0,
                pl:0,pr:0
                }}>
              <CloseRounded component="svg" />
            </Button>
              <Typography id="modal-text" variant="h5">
                Login!
              </Typography>
              <TextField  value={inputs.username || ""} onChange={handleInputs}
              id="username-field" name="username" type="text" label="Your username" margin="normal" required />
              <TextField value={inputs.email || ""} onChange={handleInputs}
              id="email-field" name="email" type="email" label="Your email address" autoComplete="false" margin="normal" required />
              <TextField value={inputs.password || ""} onChange={handleInputs}
              id="password-field" name="password" type="password" label="Password" required 
              margin="normal" />
              <br/>
              {error? (
                <Typography sx={{color:"error.main"}} >Unable To log in, try again</Typography>
              ) : (null) }
              <br/>
              <Box>
                <Button type='button' onClick={()=>{
                  setLoading(true);
                  loginUser();
                  //navi("/profile");
                }}
                sx={{
                  bgcolor:"secondary.dark",
                  color:"common.black",
                  width:{md:"40%", xs:"60%"},
                  fontSize:{xs:"0.8rem"}
                }}>
                  {loading && <CircularProgress 
                  variant="indeterminate" size="30px" sx={{mr:1}} />
                  }
                  Login
                </Button>
                <br/>
                <Button type="button" onClick={() => {
                  handleClosing();
                  navi("/profile");
                }}
                sx={{
                  bgcolor:"primary.light",
                  color:"common.black",
                  mt:2
                  }}>
                  Don't have an account? Sign up here
                </Button>
              </Box>
          </Box>
        </Modal>
        </>
    )
}