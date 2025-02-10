import { Alert, Backdrop, Box, Button, CircularProgress, Collapse, Container, IconButton, Snackbar, styled, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Filter } from "bad-words"

import blogRequest from "../requests/blogRequests.js"
import { CloseTwoTone, ContentCopy } from "@mui/icons-material";

const MyBox = styled(Box)(({theme})=> ({
    display:"flex",
    flexDirection:"column", flexWrap:"wrap",
    justifyContent:"center", alignContent:"space-evenly",
}));


export default function CreateBlog(props) {
    const [inputs, setInputs] = useState({}); //to hanlde input fields
    const [error, setError] = useState(""); //to display error messages
    const [loading, setLoading] = useState(false); //to display loading indicators when fetch/posting data to the backend
    const [open, setOpen] = useState(false); //to handle snackbar
    const [alertOpen, setAlertOpen] = useState(false); //to handle the success alert

    const username = useSelector((store) => store.info.username); //global username state
    const token = useSelector((store) => store.info.token); //global token state
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
        if (!inputs.title || !inputs.content) {
            setError("Fill the input fields");
            setLoading(false);
            throw new Error("empty input fields");
        }
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
        props.setLoading(true);
        blogRequest.createBlog(data, token).then((response)=> {
            //console.log(response.data);
            console.log("success");
            setLoading(false);
            setAlertOpen(true);
            setTimeout(()=>{
                props.setLoading(false);
                navi("/profile");
            }, 2000)
        }).catch((err) => {
            setLoading(false);
            props.setLoading(false);
            console.error(err);
            throw new Error("failed to submit token");
        })
    }

    let time;    
    function inputErrorHandler(e) {
        return;
        clearTimeout(time);
        setError("");
        time = setTimeout(()=>{
            if (e.target.value.length < 15) {
                setError("Input is too short");
            } else {
                setError("");
            }
        }, 3000)
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
                    id="title" name="title" label="title" margin="normal" required
                    sx={{width:"60%"}} 
                    onInput={inputErrorHandler}/>
                    
                    <TextField value={inputs.content || ""} onChange={handleInputs} 
                    id="content" name="content" label="content" margin="normal" multiline minRows={6} 
                    helperText="Minimum 100 words" required placeholder="Click the Clipboard icon to copy Lorem Ipsum into your clipboard"
                    />
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
                    }}>
                        Submit blog!
                    </Button>
                    {loading && <Backdrop open={loading}>
                            <CircularProgress variant="indeterminate" size="90px" sx={{mr:1}} /> 
                        </Backdrop>}
                    {error && <Typography color="error.main">
                        {error}
                        </Typography>
                        }
                </MyBox>
                <Box>
                    <Collapse in={alertOpen}>
                        <Alert severity="success" action={
                            <IconButton aria-label="close" color="inherit" size="small"
                            onClick={()=>{
                                setAlertOpen(false);
                                }}>
                                <CloseTwoTone />
                            </IconButton>
                        }>Successfully created blog! returning to profile...
                        </Alert>
                    </Collapse>
                </Box>
            </Container>
        </>
    )
}