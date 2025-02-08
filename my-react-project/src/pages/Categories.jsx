import { Box, Container, FormControl, InputLabel, MenuItem, Paper, Select, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import blogRequests from "../requests/blogRequests.js";

export default function Categories(props) {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState([{
        title:"Default Title",
        content:"Lorem Lorem Lorem",
        tags:["Blog"]
    }]);
    const [categories, setCategories] = useState(["All Tags"]);
    const [currentSelection, setCurrent] = useState("All Tags");

    function handleSelection(e) {
        setCurrent(e.target.value);
    }

    function grabTags() {
        blogRequests.fetchCategories().then((response)=>{
            //console.log(response.data);
            setCategories(["All Tags"].concat(response.data.tags));
            //setLoading(false);
        }).catch((err)=>{
            console.error(err);
            //setLoading(false);
        })
    }
    function grabBlogsByTags(category) {
        if (category === "All Tags") {
            blogRequests.fetchAllBlogs().then((response) => {
                //console.log(response.data);
                setInfo(response.data.blogs);
                setLoading(false)
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            })
        } else {
            blogRequests.fetchBlogsByCategories(currentSelection).then((response) => {
                //console.log(response.data);
                //console.log(currentSelection);
                setInfo(response.data.blogs);
                setLoading(false)
            }).catch((err) => {
                console.error("error cuz: "+err);
                setLoading(false);
            })
        }
    }

    function setPageLength(num) {
        document.documentElement.style.setProperty("--search-results", `${Math.floor(45*num)}vh`);
        //console.log(document.documentElement.style.getPropertyValue("--search-results"));
    }

    useEffect(()=>{
        document.title = "Categories"
        grabTags();
    },[]);

    useEffect(()=>{
        setLoading(true);
        grabBlogsByTags(currentSelection);
        //return () => setPageLength(info.length);
        setPageLength(info.length);
    },[currentSelection])

    if (loading) {
        return (
            <Container sx={{p:10}}>
                <Skeleton variant="rounded" height="400px" />
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" height="90vh" />
            </Container>
        )
    }

    return (
        <>
            <Container sx={{p:4}}> 
                <Paper sx={{
                    p:2,
                    m:3,
                    }}>
                    <FormControl fullWidth >
                        <InputLabel id="select-label">Category</InputLabel>
                        <Select labelId="select-label" 
                        label="Category"
                        value={currentSelection}
                        onChange={handleSelection} 
                        >
                             {categories.map((val, index) => (
                            <MenuItem value={val} key={index}>
                                {val}
                            </MenuItem> 
                            )
                        )}
                        </Select>
                    </FormControl>
                </Paper>
                <Paper elevation={4}>
                    <Box id="tag-results-box" sx={{
                        "--search-results":"250vh",
                        maxHeight:"var(--search-results)",
                        minHeight:"45vh",
                        p:{md:5, sm:2}
                    }}>
                        {info.map((val,index) => 
                        <Paper elevation={5} key={index} sx={{
                            p:{md:5, sm:3},
                            m:{md:1, sm:3},
                        }}>
                            <Link to={`/blog/id/${val._id}`} style={{
                                textDecoration:"none"
                            }}>
                                <Typography variant="h4" sx={{
                                    textDecoration:"none",
                                    color:"primary.light",
                                    fontSize:{sm:"1.9rem"},
                                    ":hover":{
                                        color:"primary.main",
                                        textDecoration:"underline"
                                    }
                                    }}>
                                    {val.title}
                                </Typography>
                            </Link>

                            <Typography variant="body1" sx={{
                                textIndent:"10px",
                                fontWeight:300,
                                fontSize:"1.2rem",


                            }}>
                                {val.content.slice(0, 50)}...
                            </Typography>

                            <Box 
                            sx={{
                                width:"fit-content",
                                p:0, 
                                //border:"1px solid #51f",
                                m:2,
                                ml:0,
                                display:"flex",
                                justifyContent:"space-between",
                                flexWrap:"nowrap"
                                }}>
                                    {val.tags.map((v,i)=> i % 2===0 ? (    
                                <Typography variant="overline" key={i} sx={{
                                    m:0,
                                    p:1.0,
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
                                        m:0,
                                        p:1.0,
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
                        </Paper>)}
                    </Box>

                </Paper>
            </Container>
        </>
    )
}