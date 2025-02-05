import { Box, Button, CircularProgress, Container, styled, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Filter } from "bad-words"

import blogRequest from "../requests/blogRequests.js"

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
    const username = useSelector((store) => store.info.username);
    const token = useSelector((store) => store.info.token);
    let navi = useNavigate();

    let filter = new Filter();

    let MyBox = styled(Box)(({theme})=> ({
        display:"flex",
        flexDirection:"column", flexWrap:"wrap",
        justifyContent:"center", alignContent:"space-evenly"
    }));

    function handleInputs(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setInputs((previousValues) => {return {...previousValues, [nam]:val}});

        if (filter.isProfane(val)) {
            setError("Input contains bad words, please change them");
        } else {
            setError("");
        }
    }

    function submitBlog() {
        let data = {
            author:username,
            //authorId:"" this value is covered by the decoded token
            title:inputs.title,
            content:inputs.content,
            img:"https://placehold.co/1280x768/000000/a5f",
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
            console.log(response.data);
            console.log("success");
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        })
    }
    
    if (!username) {
        return (
            <>
                <Container sx={{height:"70vh"}}>
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
            <Container>
                <MyBox>
                    <Typography variant="h5">
                        Write Your own Blog
                    </Typography>
                    <TextField value={inputs.title || ""} onChange={handleInputs}
                    id="title" name="title" label="title" margin="normal" />
                    
                    <TextField value={inputs.content || ""} onChange={handleInputs}
                    id="content" name="content" label="content" margin="normal" multiline minRows={4} 
                    autoComplete="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem delectus, fugiat eaque iure adipisci commodi dolor placeat unde voluptas temporibus rerum velit accusamus, odio iste, consequatur numquam porro officiis repellat." />

                    <Button variant="outlined" disabled={error} color="secondary.main" 
                    onClick={()=>{
                        setLoading(true);
                        submitBlog();
                    }}>
                        {loading && 
                            <CircularProgress variant="indeterminate" size="30px" sx={{mr:1}} 
                        />}
                        Submit blog!
                    </Button>
                    {error && <Typography color="danger.main">
                        Title or content contain bad words, please change them
                        </Typography>
                        }
                </MyBox>
            </Container>
        </>
    )
}