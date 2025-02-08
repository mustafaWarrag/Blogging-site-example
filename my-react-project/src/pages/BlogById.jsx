import { Container, Paper, Card, CardMedia, Typography, Divider, CardContent, Avatar, Box, Skeleton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react"
import imgPlaceholder from "../images/woman-holding-camera-1.jpg"
import { Link, useParams } from "react-router-dom";

import blogRequests from "../requests/blogRequests.js";

let arr = [];
arr.length = 5;
arr.fill("");

export default function BlogById(props) {
    const [info, setInfo] = useState({
        author:"John Doe",
        title:"Default Blog Title: The Blog Sub-title",
        content:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos dolore earum voluptatibus neque aperiam! Hic dolore, accusantium voluptatem, porro illo vel quisquam pariatur laborum atque doloribus nemo facere autem eos.",
        img:imgPlaceholder,
        imgLink:"/",
        tags:["Blog","Default"],
        uploadDate:new Date()
    });
    const [loading, setLoading] = useState(true);

    let params = useParams()

    function grabBlog(id) {
        blogRequests.fetchBlogById(id).then((response) => {
            //console.log(response.data);
            if (response.data.blog.length < 1) {
                return setLoading(false);
            } else {
                setInfo(response.data.blog);
            }
            setLoading(false);
        }).catch((err)=>{
            console.error(err);
        })
    }
    
    function contentSplit(txt="") {
        let arr = txt.split("1");
        return arr;
    }

    function detectScroll () {
        let ele = document.getElementById("progress-line");
        if (window.scrollY > 480) {
            ele.style.display = "block";
            ele.classList.add("slide-boys");
        } else {
            ele.style.display = "none";
            ele.classList.remove("slide-boys");
        }
        let bar = window.scrollY;
        ele.style.setProperty("--progressing-bar",`${Math.min((bar / 26.7), 100)}%`);
        ele.style.setProperty("--progressing-bar-lg",`${Math.min((bar / 26.7),99.85)}%`);
        ele.style.setProperty("--progressing-bar-md",`${Math.min((bar / 26.7),99.95)}%`);
        ele.style.setProperty("--progressing-bar-sm",`${Math.min((bar / 26.7),100)}%`);
    }

    useEffect(()=>{
        grabBlog(params.id);
        window.addEventListener("scroll", detectScroll);
        return () => window.removeEventListener("scroll", detectScroll)
    },[])

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

            <Divider component="hr" id="progress-line" sx={{
                display:"none",
                color:"#000",
                border:"3px solid",
                borderColor:"primary.main",
                "--progressing-bar":"100px",
                "--progressing-bar-lg":"80px",
                "--progressing-bar-md":"50px",
                "--progressing-bar-sm":"30px",
                width:
                    {xl:"var(--progressing-bar)", 
                    lg:"var(--progressing-bar-lg)", 
                    md:"var(--progressing-bar-md)", 
                    xs:"var(--progressing-bar-sm)"
                    },
                maxWidth:"100%",     
                position:"sticky",
                top:"0px",
                left:0
                    }} />

            <Container disableGutters sx={{
                pb:3,
                pt:{md:3, xs:0}
                }}>
            <Card>
                <CardMedia image={info.img? info.img : imgPlaceholder} component="img" title={info.imgLink} 
                sx={{
                    height:"500px",
                    backgroundSize:"cover",
                    backgroundPosition:"center center",
                    borderBottom:`10px solid ${deepPurple[500]}`
                    }} />
                <Paper elevation={3} sx={{
                p:{md:11, xs:2},
                //bgcolor:"common.black"
            }}>         
                        
                        <Typography variant="h3" component="h3" id="blog-header" >
                            {info.title}
                        </Typography>
                        <Typography variant="overline">
                            Categories:{info.tags.map((v, i)=> <Link to="/" key={i} style={{margin:"5px"}}>
                            {v}
                            </Link>)}
                        </Typography>
                        <Box sx={{
                            display:"flex",
                            justifyContent:"left",
                            alignContent:"center",
                            alignItems:"center",
                            mb:1
                        }}>
                            <Avatar sx={{
                                pr:"1"
                            }}>{info.author.at(0)}</Avatar>
                            <Typography variant="h6" color="primary.light" sx={{
                                fontStyle:"italic",
                                fontWeight:"300",
                                letterSpacing:".2rem",
                                ml:1
                            }}>
                                -By {info.author}
                            </Typography>
                    </Box>
                    
                    <CardContent>
                        <Box sx={{p:0,m:0}}>
                            
                            {contentSplit(info.content).map((val,index) => index%2 !== 0? (
                                    <Typography key={index} variant="h4" sx={{fontStyle:"italic", fontWeight:"500"}}>
                                        {val}
                                        </Typography>
                            ) : (
                                <Typography key={index} variant="body1" sx={{
                                    fontSize:"16px",
                                    //fontWeight:300,
                                    fontOpticalSizing:"auto",
                                    fontFamily:"Inter, sans-serif",
                                    lineHeight:"1.95rem",
                                    letterSpacing:"0.03rem",
                                    p:2,
                                    mb:3
                                    }}>
                                    {val}
                                </Typography>
                            ) )}
                            
                        </Box>
                        
                    </CardContent>
                    <Paper elevation={4} sx={{
                        p:{md:10, xs:4},
                        mb:4,
                        bgcolor:"primary.light",
                        color:"common.black"
                    }}>
                        <Box sx={{display:"inline-flex"}}>
                            <Avatar>{info.author.at(0)}</Avatar>
                            <Typography variant="h4" sx={{
                                ml:2,
                                }}>
                                {info.author}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{
                            fontStyle:"italic",
                            fontWeight:"300",
                            color:"common.black"
                            //letterSpacing:".2rem",
                        }}>
                             -Game Of Thrones Character
                        </Typography>
                        <Typography variant="subtitle1" sx={{
                            textIndent:"20px",
                            fontSize:"1.4rem",
                            fontWeight:"300",
                            fontFamily:"monospace"
                        }}>
                            {info.author} is a charcter from the famous Georage R.R. Martin Novel "A Song Of Ice And Fire". 
                            These author names serve only as a parody for demostration purposes, the rights belong to the man himself
                        </Typography>
                    </Paper>
                    <br/>
                    <Box sx={{
                            textAlign:"right"
                        }}>                
                        <Typography variant="body2" component="a" href="#blog-header" 
                        sx={{
                            color:"secondary.main"
                        }}>
                            back to top
                        </Typography>
                    </Box>
                </Paper>
            </Card>

            </Container>
        </>
    )
}