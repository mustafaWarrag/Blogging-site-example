import { Alert, Box, Button, CircularProgress, Collapse, Container, IconButton, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleOutline, DeleteTwoTone, EditNoteTwoTone } from "@mui/icons-material";
import { Filter } from "bad-words";

import userRequests from "../requests/userRequests.js";
import blogRequests from "../requests/blogRequests.js";

import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../features/userSlice.js";

import EditBlog from "./EditBlog.jsx";

export default function Profile(props) {
    const [info, setInfo] = useState([{}]); //returns null if no blogs were found
    const [infoLoading, setInfoLoading] = useState(true); //loading state of the blogs
    const [inputs, setInputs] = useState({}); //to handle input fields when registering
    const [error, setError] = useState(""); //to handle errors of input
    const [loading, setLoading] = useState(false); //loading indicator for when the user account 

    const [modalOpen, setModal] = useState(false); //to handle the EditBlog component
    
    const [alertOpen, setAlert] = useState(""); //to handle the edit/delete alert

    const username = useSelector((store)=> store.info.username);
    const token = useSelector((store)=> store.info.token);

    let dispatch = useDispatch()
    let navi = useNavigate();

    let filter = new Filter();

    function handleInputs(e) {
        let val = e.target.value;
        let nam = e.target.name;
        setInputs((values) => ({...values, [nam]:val}));
        if (filter.isProfane(val)) {
            setError("Error! input contains bad words");
            //throw new Error("bad words");
        } else {
            setError("");
        }
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
        setError("");
        
        userRequests.createAccount(data).then((response) => {
          console.log("account was created sucessfully");
          //console.log(response.data);
          //handleClosing();
          handleDispatching(data.username, token); 
          setLoading(false);
        }).catch((err) => {
          console.error("err");
          setError("Unable to create account, try again");
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
                //console.log(response.data);
                let date = response.data.registerDate;
                registerDate = date;
            }).catch((err) => {
                //console.error("bad token "+ err);
                console.error("bad token");
                useDispatch(logout());
                localStorage.clear();
                registerDate = Date.now();
            })
        }
      }
      
      function getOwnBlogs() {
        setInfoLoading(true);
        blogRequests.fetchBlogsByAuthor(token).then((response) => {
            //console.log(response.data);
            setInfo(response.data.blogs);
            setInfoLoading(false);
        }).catch((err) => {
            console.error("error: " + err);
            setInfoLoading(false);
        })
      }

      const [currentBlogId, setBlogId] = useState("1"); //to handle which blog to edit currently
      function editBlog(blogId) {
        setModal(true);
        setBlogId(blogId);
      }

      function deleteBlog(blogId) {
        blogRequests.deleteBlog(blogId, token).then((response) => {
            console.log("successfully deleted blog");
            //console.log(response.data);
            setAlert("deleted"); //display alert message
            setTimeout(()=>{
                setAlert(""); //autohide message after 3 seconds
            }, 3000)
            getOwnBlogs(); //display new list of blogs
        }).catch((err) => {
            console.error(err);
        })
      }

      

    if (token) {
        useEffect(()=>{
            document.title = "Profile";
            profileView();
            getOwnBlogs();
      },[]);

        return (
            <>
                <Container disableGutters sx={{minHeight:"80vh", p:5}}>
                    <Collapse in={alertOpen? true : false}>
                        <Alert icon={<CheckCircleOutline />} severity="success" >
                            Succuessfuly {alertOpen} blog!
                        </Alert>
                    </Collapse> 
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
                            <Button sx={{bgcolor:"secondary.main", color:"common.black", mb:2}} 
                            onClick={()=>{
                                navi("/create-blog");
                            }}>
                                Create Blog
                            </Button>

                            <Button sx={{bgcolor:"warning.main", color:"common.black"}} 
                            onClick={()=>{
                                dispatch(logout()); //returns global state to null
                                localStorage.clear(); //deletes token from local storage
                                navi("/")
                            }}>
                                Logout
                            </Button>
                            <Box sx={{mt:2}}>
                                {/*display the list of blogs created by the author*/}
                                {info.length > 0? (
                                        <Typography variant="overline" sx={{fontSize:"1.1rem", color:"secondary.main", textAlign:"center"}}>
                                            Your Blogs:
                                        </Typography>
                                    ) : (
                                        <Typography>Your Blogs will show up here, if this existed :/</Typography>
                                    )}
                                {infoLoading? (<Skeleton variant="rectangular" height="30vh" width="60vw" />
                                ) : (info && info.map((val,index) => 
                                <Paper elevation={5} key={index} sx={{
                                    p:{md:5, sm:3},
                                    m:{md:1, sm:3},
                                }}>
                                    <Link to={`/blog/id/${val._id}`} style={{textDecoration:"none"}}>
                                        <Typography variant="h4" sx={{
                                            textDecoration:"none",
                                            color:"primary.light",
                                            fontSize:{sm:"1.9rem"},
                                            ":hover":{color:"primary.main", textDecoration:"underline"}
                                            }}>
                                            {val.title}
                                        </Typography>
                                    </Link>
                                    <Typography variant="body1" sx={{
                                        textIndent:"10px",
                                        fontWeight:300, fontSize:"1.2rem" 
                                        }}>
                                        {val.content.slice(0, 50)}...
                                    </Typography>
                                    <Box sx={{float:"right"}}>
                                        <IconButton centerRipple title="Delete Blog" 
                                        onClick={()=>{
                                            deleteBlog(val._id);
                                        }}>
                                            <DeleteTwoTone />
                                        </IconButton>
                                        <IconButton centerRipple title="Edit Blog"
                                        onClick={()=>{
                                            editBlog(val._id);
                                        }}>
                                            <EditNoteTwoTone />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{
                                            width:"fit-content",
                                            p:0, m:2, ml:0,
                                            display:"flex", flexWrap:"nowrap",
                                            justifyContent:"space-between"
                                            }}>
                                        {val.tags.map((v,i)=> i % 2===0 ? (    
                                            <Typography variant="overline" key={i} sx={{
                                                m:0, p:1.0,
                                                border:"1px solid #b3f",
                                                borderRadius:"5px",
                                                borderRight:"1px solid #b3f",
                                                borderTopRightRadius:"0",
                                                borderBottomRightRadius:"0"
                                                }}>
                                                {v}
                                            </Typography>
                                        ) : (
                                            <Typography variant="overline" key={i} sx={{
                                                m:0, p:1.0,
                                                border:"1px solid #b3f",
                                                borderRadius:"5px",
                                                borderLeft:"none",
                                                borderTopLeftRadius:"0",
                                                borderBottomLeftRadius:"0"
                                                }}>
                                                {v}
                                            </Typography>
                                            )
                                        )}
                                    </Box>
                                </Paper>)
                                
                                )}
                            </Box>
                            {modalOpen && <EditBlog id={currentBlogId} 
                            modalOpen={modalOpen} setModal={setModal} 
                            getOwnBlogs={getOwnBlogs} setAlert={setAlert} />}
                            {/*only render EditBlog comp if the modal is opened*/}
                        </Box>
                    </Paper>
                </Container>
            </>
        )
    }
    useEffect(()=>{
        document.title = "Sign Up!";
    },[])
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
                            {error}
                            </Typography>}

                        <br/>
                        <Button type="button" disabled={error? true : false}
                        sx={{bgcolor:"success.main", color:"common.black", 
                            ":disabled":{
                                bgcolor:"warning.light"
                            }}} 
                        onClick={()=>{
                            createUser();
                            navi("/");
                            //setLog(true);
                        }}>
                            {loading && 
                                <CircularProgress variant="indeterminate" size="30px" sx={{mr:1}} /> }
                            Sign Up!
                        </Button>
                        <br/>
                        <Button type="button" sx={{bgcolor:"info.main", color:"common.black"}}
                        onClick={()=>{
                            navi("/");
                            props.setOpen(true);
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