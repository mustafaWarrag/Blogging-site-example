import { Container, Paper, Card, CardMedia, Typography, Divider, CardContent, Avatar, Box, Skeleton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect } from "react";
import "../index.css";
let arr = [];
arr.length = 6;
arr.fill("");

export default function BlogOne(props) {

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
    useEffect(()=> {
        window.addEventListener("scroll", detectScroll);
        return ()=> window.removeEventListener("scroll", detectScroll);
    }
    ,[])

    if (props.loading === true) {
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
        <Container component={"div"} id="con-blog" sx={{pt:3,pb:3}}>
            <Card>
                <CardMedia image={props.image} sx={{
                    height:"400px",
                    backgroundSize:"cover",
                    backgroundPosition:"center 30%",
                    borderBottom:`10px solid ${deepPurple[500]}`
                    }} />
                <Paper elevation={3} sx={{
                p:{md:11, xs:6},
                //bgcolor:"common.black"
            }}>         
                        
                        <Typography variant="h3" component="h3" id="blog-header" >
                            Blog Title: The Blog Sub-title
                        </Typography>
                        <Box sx={{
                            display:"flex",
                            justifyContent:"left",
                            alignContent:"center",
                            alignItems:"center",
                            mb:5
                        }}>
                            <Avatar sx={{
                                pr:"1"
                            }}>A</Avatar>
                            <Typography variant="h6" color="primary.light" sx={{
                                fontStyle:"italic",
                                fontWeight:"300",
                                letterSpacing:".2rem",
                                ml:1
                            }}>
                                -By Author Name
                            </Typography>
                    </Box>
                    
                    <CardContent>
                        {arr.map((val,index)=> (
                            <Box key={index}>
                            <Typography variant="h4">
                            Header {index}
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize:"16px",
                            //fontWeight:300,
                            fontOpticalSizing:"auto",
                            fontFamily:"Inter, sans-serif",
                            lineHeight:"1.95rem",
                            letterSpacing:"0.03rem",
                            p:2,
                            mb:6
                        }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi molestiae repudiandae perspiciatis. Excepturi maxime enim ad ab consectetur quo laudantium natus, tenetur totam, dignissimos hic sequi perspiciatis rerum. Facere.
                            <br/>
                            <br/>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus repudiandae veritatis soluta accusantium vero autem voluptatibus. Ab, cumque unde, sed fuga culpa explicabo quaerat recusandae aliquam officiis nulla nisi similique!
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quibusdam id, commodi placeat debitis recusandae iure. Eligendi perferendis illo quod magni. Placeat, eum! Aliquam aut natus, ullam hic animi repudiandae!
                        </Typography>
                            </Box>
                            )
                        )}

                        {/*
                        <Typography variant="h4">
                            Header 1
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize:"16px",
                            //fontWeight:300,
                            fontOpticalSizing:"auto",
                            fontFamily:"Inter, sans-serif",
                            lineHeight:"1.95rem",
                            letterSpacing:"0.03rem",
                            p:2,
                            mb:6
                        }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi molestiae repudiandae perspiciatis. Excepturi maxime enim ad ab consectetur quo laudantium natus, tenetur totam, dignissimos hic sequi perspiciatis rerum. Facere.
                            <br/>
                            <br/>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus repudiandae veritatis soluta accusantium vero autem voluptatibus. Ab, cumque unde, sed fuga culpa explicabo quaerat recusandae aliquam officiis nulla nisi similique!
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quibusdam id, commodi placeat debitis recusandae iure. Eligendi perferendis illo quod magni. Placeat, eum! Aliquam aut natus, ullam hic animi repudiandae!
                        </Typography>
                        
                        
                        <Typography variant="h5">
                            Header 2
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize:"1.5rem",
                            fontWeight:300,
                            lineHeight:"2.5rem",
                            letterSpacing:"0.05rem",
                            p:2,
                            mt:2,
                            textIndent:"20px"
                        }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi molestiae repudiandae perspiciatis. Excepturi maxime enim ad ab consectetur quo laudantium natus, tenetur totam, dignissimos hic sequi perspiciatis rerum. Facere.
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus repudiandae veritatis soluta accusantium vero autem voluptatibus. Ab, cumque unde, sed fuga culpa explicabo quaerat recusandae aliquam officiis nulla nisi similique!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quibusdam id, commodi placeat debitis recusandae iure. Eligendi perferendis illo quod magni. Placeat, eum! Aliquam aut natus, ullam hic animi repudiandae!
                        </Typography>

                        <Typography variant="h5">
                            Header 3
                        </Typography>
                        <Typography variant="body1" sx={{
                            fontSize:"1.5rem",
                            fontWeight:300,
                            lineHeight:"2.5rem",
                            letterSpacing:"0.05rem",
                            p:2,
                            mt:2,
                            textIndent:"20px"
                        }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni nisi molestiae repudiandae perspiciatis. Excepturi maxime enim ad ab consectetur quo laudantium natus, tenetur totam, dignissimos hic sequi perspiciatis rerum. Facere.
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus repudiandae veritatis soluta accusantium vero autem voluptatibus. Ab, cumque unde, sed fuga culpa explicabo quaerat recusandae aliquam officiis nulla nisi similique!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quibusdam id, commodi placeat debitis recusandae iure. Eligendi perferendis illo quod magni. Placeat, eum! Aliquam aut natus, ullam hic animi repudiandae!
                        </Typography>
                        */}
                    </CardContent>
                    <Paper elevation={4} sx={{
                        p:10,
                        mb:4,
                        bgcolor:"primary.light",
                        color:"common.black"
                    }}>
                        <Box sx={{display:"inline-flex"}}>
                            <Avatar>A</Avatar>
                            <Typography variant="h4" sx={{
                                ml:2,
                                }}>
                                Author Name
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{
                            fontStyle:"italic",
                            fontWeight:"300",
                            color:"common.black"
                            //letterSpacing:".2rem",
                        }}>
                             -Content Writer
                        </Typography>
                        <Typography variant="subtitle1" sx={{
                            textIndent:"20px",
                            fontSize:"1.4rem",
                            fontWeight:"300",
                            fontFamily:"monospace"
                        }}>
                            Author is a talented indivdual capable of many things interested in traveling, fitnees and cooking
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