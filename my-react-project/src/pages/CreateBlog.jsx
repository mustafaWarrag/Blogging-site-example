import { Box, Button, CircularProgress, Container, IconButton, Snackbar, styled, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Filter } from "bad-words"

import blogRequest from "../requests/blogRequests.js"
import { ContentCopy } from "@mui/icons-material";

const MyBox = styled(Box)(({theme})=> ({
    display:"flex",
    flexDirection:"column", flexWrap:"wrap",
    justifyContent:"center", alignContent:"space-evenly",
}));


export default function CreateBlog(props) {
    //install Morgan to track fetch requests [done]
    //install Redux for global state management, particularly for user authentication
    //configure backend code for accepting Sign-up authentication  [done]
    //encrypt user passwords with bcrypt [done]
    //use JWT for generating tokens after sign-in [done]
    //figure out a way to make passwords be at least 6 characters [done-ish]
    //implement a way so that when signing up, the user is given a token and automatically navigates to "/profile"
    //and then store the token in the global state [done]

    //require the user being "admin" in order to fetch all users

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); //to handle snackbar
    const username = useSelector((store) => store.info.username);
    const token = useSelector((store) => store.info.token);
    let navi = useNavigate();

    let filter = new Filter();

    let lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus, fugiat eaque iure adipisci commodi dolor placeat unde voluptas temporibus rerum velit accusamus, odio iste, consequatur numquam porro officiis repellat."

    function handleInputs(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setInputs((previousValues) => ({...previousValues, [nam]:val}));
        
        if (filter.isProfane(val)) {
            setError("Input contains bad words, please change them");
        } else {
            setError("");
        }
    }
    function handleOpening() {
        setOpen(true);
    }
    function handleClosing() {
        setOpen(false);
    }

    function submitBlog() {
        let data = {
            author:username,
            //authorId:"" this value is covered by the decoded token
            title:inputs.title,
            content:inputs.content,
            img:`https://placehold.co/1360x768/111111/a1f?text=Placeholder+Image`,
            imgLink:"https://placehold.co",
            tags:["Blog", "Default"]
        };
        if (filter.isProfane(inputs.title) || filter.isProfane(inputs.content)) {
            throw new Error("input contains bad words");
        }
        if (!token) {
            setError("invalid sign in");
            throw new Error("invalid token");
        }
        blogRequest.createBlog(data, token).then((response)=> {
            //console.log(response.data);
            console.log("success");
            setLoading(false);
            navi("/");
        }).catch((err) => {
            setLoading(false);
            console.error(err);
            throw new Error("failed to submit token");
        })
    }
        useEffect(()=>{
            document.title = "Create Blog"
        },[]);
    
    if (!username) {
        return (
            <>
                <Container sx={{height:"86vh"}}>
                    <MyBox>
                        <Typography>
                            Something is wrong :/  
                        </Typography>
                        <Button variant="contained" onClick={()=>{
                            navi("/");
                        }}>
                            Return to home
                        </Button>
                    </MyBox>
                </Container>
            </>
        )
    }

    return (
        <>
            <Container sx={{minHeight:"86vh", p:5, pt:7}}>
                <MyBox>
                    <Typography variant="h5" sx={{textAlign:"center"}}>
                        Write Your own Blog
                    </Typography>
                    <TextField value={inputs.title || ""} onChange={handleInputs}
                    id="title" name="title" label="title" margin="normal" sx={{width:"60%"}} />
                    
                    <TextField value={inputs.content || ""} onChange={handleInputs}
                    id="content" name="content" label="content" margin="normal" multiline minRows={6}  />
                    <Box sx={{mb:2}}>
                        <IconButton title="click to copy lorem" onClick={()=>{
                            navigator.clipboard.writeText(lorem).then(()=>{
                                handleOpening();
                            });
                        }}>
                            <ContentCopy />
                        </IconButton>
                    </Box>
                    <Snackbar
                    open={open}
                    onClose={handleClosing}
                    message="Copied Lorem successfully"
                    autoHideDuration={4000} 
                    />

                    <Button variant="outlined" disabled={error? true : false} color="secondary.main" 
                    onClick={()=>{
                        setLoading(true);
                        submitBlog();
                        //navi("/");
                        // for tomorrow:
                        //display an error if an error exists
                        //display a success message
                        //fix the submitBLog function, there is a validation error requiring
                        //the authorId
                        //which means that the token verify stuff may not work
                        //or maybe it does, try it tomorrow
                    }}>
                        {loading && 
                            <CircularProgress variant="indeterminate" size="30px" sx={{mr:1}} 
                        />}
                        Submit blog!
                    </Button>
                    {error && <Typography color="error.main">
                        Title or content contain bad words, please change them
                        </Typography>
                        }
                </MyBox>
            </Container>
        </>
    )
}