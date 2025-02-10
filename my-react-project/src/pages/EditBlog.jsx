import { Box, Button, CircularProgress, Modal, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Filter } from "bad-words";

import { useSelector } from "react-redux";

import blogRequests from "../requests/blogRequests.js";


export default function EditBlog(props) {
    const [blogInput, setBlog] = useState({}); //to handle title and content inputs
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(true);
    let filter = new Filter();

    const token = useSelector((store)=> store.info.token);

    function handleBlogInput(e) {
        let name = e.target.name;
        let val = e.target.value;
        
        setBlog((previousValues) => ({...previousValues, [name]:val}));
        if (filter.isProfane(val)) {
            setError("title or content has bad words :( ");
        } else {
            setError("");
        }
    }
    function finishEditing() {
        if (!blogInput.title || !blogInput.content) {
            setError("input is empty!");
            throw new Error("empty inputs");
        } else {
            setError("");
        }
        let data = {
            id:props.id,
            //authorId:"", covered by the token
            title:blogInput.title,
            content:blogInput.content
        }
        blogRequests.editBlog(data, token).then((response) => {
            //console.log(response.data);
            console.log("successfully edited blog");
            props.setModal(false); //hide modal
            props.setAlert("edited"); //display edit message
            setTimeout(()=>{
                props.setAlert(""); //autohide after 3 seconds
            }, 3000)
            props.getOwnBlogs(); //display new list of blogs
        }).catch((err) => {
            console.log("error: Unable to Edit Blog" + err);
            setError("Unable to edit blog, try again!")
        })
    }
    function getPreExisingBlog() {
        //fetch data then update the textFields with the previous title and content
        let id = props.id;
        blogRequests.fetchBlogById(id).then((response) => {
            //console.log(response.data.blog);
            setBlog({
                title:response.data.blog.title,
                content:response.data.blog.content
            });
            setLoading(false); //wait until data is fetched
        }).catch((err) => {
            setLoading(false);
            console.error("error");
            setBlog({
                title:"",
                content:""
            })
        })
    }
    useEffect(()=>{
        getPreExisingBlog();
        //console.log(`props.id:${props.id}`)
    },[])


    return (
        <>
            <Modal
            open={props.modalOpen} onClose={()=>{props.setModal(false)}}
            sx={{
                display:"flex",
                flexDirection:"column", flexWrap:"nowrap",
                justifyContent:"center", alignItems:"center"
            }}>
                {loading? (
                    <Paper variant="outlined" sx={{
                        minHeight:"60vh", maxHeight:"89vh",
                        width:"65vw", 
                        display:"flex", 
                        flexDirection:"column", flexWrap:"nowrap",
                        justifyContent:"center", alignItems:"center"
                        }}>
                        <CircularProgress size="90px" sx={{textAlign:"center"}}  />
                    </Paper>
                ) : (
                <Paper variant="outlined" sx={{
                    minHeight:"60vh", maxHeight:"90vh",
                    width:"65vw",
                    }}>
                    <Box sx={{
                        display:"flex", p:0,
                        flexDirection:"column",
                        justifyContent:"center", flexWrap:"wrap"
                        //overflow:"auto"
                        //border:"1px solid", 
                        //borderColor:"info.dark", borderRadius:"5px"
                    }}>
                        <Typography variant="overline" sx={{
                            bgcolor:"info.main", color:"common.black", 
                            mt:0, p:2, 
                            fontSize:"1.1rem", textAlign:"center", 
                            borderTopRightRadius:"3px", borderTopLeftRadius:"3px"
                            }}>
                            Edit your Blog
                        </Typography>
                        <Box sx={{
                            display:"flex", p:3,
                            flexDirection:"column", flexWrap:"wrap"
                        }}>
                            <TextField value={blogInput.title || ""} onChange={handleBlogInput}
                            name="title" id="title" margin="normal" label="title" required
                            />
                            <TextField value={blogInput.content || ""} onChange={handleBlogInput}
                            name="content" id="content" margin="normal" label="content"
                            multiline minRows={4} required sx={{overflow:"auto", height:"48vh"}}
                            
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <Button variant="outlined" disabled={error? true : false}
                            onClick={()=>{
                                setLoading(true);
                                finishEditing();
                            }}>
                                Finish Editing
                            </Button>    
                        </Box>
                    </Box>
                </Paper>
                )}
            </Modal>
        </>
    )
}