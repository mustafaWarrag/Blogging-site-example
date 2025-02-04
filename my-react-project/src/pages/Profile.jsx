import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import userRequests from "../requests/userRequests.js";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../features/userSlice.js";

export default function Profile(props) {
    //const [hasLogged, setLog] = useState(false); //this state should be replaced by the Redux selector
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const username = useSelector((store)=> store.info.username);
    const token = useSelector((store)=> store.info.token);

    let dispatch = useDispatch()
    let navi = useNavigate();

    function handleInputs(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setInputs((values) => ({...values, [nam]:val}))
    }

    function handleDispatching(username, token) {
          dispatch(setUser({
            username:username,
            token:token
          }));
          setTimeout(()=> console.log(username), "1000");
        }

    function createUser() {
        let data = {
          username:inputs.username,
          password:inputs.password,
          email:inputs.email
        }
        setError(false);
        
        userRequests.createAccount(data).then((response) => {
          console.log("account was created sucessfully");
          console.log(response.data);
          //handleClosing();
          handleDispatching(data.username, token); 
          setLoading(false);
        }).catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        })
      }

      let registerDate = Date.now();

      function dateFixer(date) {
        let now = new Date(date)
        let year = now.getFullYear();
        let month = now.getMonth();
        let day = now.getDay();
        let fixedDate = `${year}/${month+1}/${day+1}`;
        return fixedDate;
      }
      function profileView() {
        if (token) {
            userRequests.viewProfile(token).then((response)=>{
                console.log(response.data);
                let date = response.data.registerDate;
                registerDate = date;
                console.log(registerDate);
                console.log(dateFixer(registerDate))
            }).catch((err) => {
                console.error(err);
                registerDate = new Date.now();
            })
        }
      }
      useEffect(()=>{
        profileView();
      },[])

    if (token) {
        return (
            <>
                <Container disableGutters sx={{height:"80vh", p:5}}>
                    <Paper elevation={2} sx={{p:6}}>
                        <Box sx={{
                            display:"flex",
                            flexDirection:"column", flexWrap:"wrap",
                            justifyContent:"center", alignContent:"space-evenly"
                        }}>
                            <Typography variant="h5" margin={1}>Account Details:</Typography>
                            <Typography variant="body1" margin={1}>
                                Username:{username}
                            </Typography>
                            <Typography variant="body2" margin={1}>
                                Joined:{dateFixer(registerDate)}
                            </Typography>
                            <Button sx={{bgcolor:"warning.main", color:"common.black"}} 
                            onClick={()=>{
                                dispatch(logout()); //returns global state to null
                                localStorage.clear(); //deletes token from local storage
                                navi("/")
                            }}>
                                Logout
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </>
        )
    }

    return (
        <>
            <Container disableGutters sx={{
                p:10,
                height:"70%"
            }}>
                <Paper elevation={2} sx={{
                    p:5
                }}>
                    <Box sx={{
                        display:"flex",
                        flexDirection:"column", flexWrap:"wrap",
                        justifyContent:"center", alignContent:"space-evenly",
                    }}>
                        <Typography textAlign={"center"}>
                            Create An Account
                        </Typography>
                        <TextField value={inputs.username || ""} onChange={handleInputs}
                        id="username" name="username" label="Your Username" margin="normal" />
                       
                        <TextField value={inputs.email || ""} onChange={handleInputs}
                        id="email" name="email" label="Your Email" placeholder="me@example.com" margin="normal" />
                        
                        <TextField value={inputs.password || ""} onChange={handleInputs}
                        id="password" name="password" label="Your Password" helperText="* 8 characters at least" margin="normal" />
                        {error && <Typography sx={{color:"error.main"}}>
                            Unable to create account, try again
                            </Typography>}

                        <br/>
                        <Button type="button" sx={{bgcolor:"success.main", color:"common.black"}} 
                        onClick={()=>{
                            createUser();
                            navi("/");
                            //setLog(true);
                            //have a function that stores the token in local storage 
                            //and automatically retrives it when loading the site up
                        }}>
                            Sign Up!
                        </Button>
                        <br/>
                        <Button type="button" sx={{bgcolor:"info.main", color:"common.black"}}
                        onClick={()=>{
                            navi("/");
                            //props.
                        }} 
                        >
                            Have an account? login instead
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}