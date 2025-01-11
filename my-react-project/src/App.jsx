import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from "react-router-dom";
import { Button, Card, CardMedia, CardContent, Stack, Skeleton, Modal, TextField } from '@mui/material';
import { Box, Typography, Paper, Divider } from "@mui/material";
import { Facebook, LinkedIn, GitHub, CloseRounded } from "@mui/icons-material";
import { Container, Grid2, LinearProgress, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, cyan } from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//import 'https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Lobster&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
//install base mui [done]
//install base mui fonts [done]
//install mui icons [done]
//install emotion engine [done]
import img1 from "./images/young-woman-laptop-window.jpg";
import img2 from "./images/woman-holding-camera-2.jpeg";
import imgBlog from "./images/office-image.jpg"

import Layout from './pages/Layout.jsx';
import BlogOne from './pages/BlogOne.jsx';
import Nopage from './pages/Nopage.jsx';
import Footer from './pages/Footer.jsx';
import About from './pages/About.jsx';
import Done from './pages/Done.jsx';

function Home(props) {
  let navi = useNavigate();

  if (props.loading === true) {
    return (
      <>
        <Grid2 container spacing={2} sx={{p:5}}>
        <Grid2 size={12}>
            <Skeleton variant="rectangular" height={"80vh"} />
          </Grid2>
          <Grid2 size={8}>
            <Skeleton variant="rectangular" height={"40vh"} />
          </Grid2>
          <Grid2 size={4}>
            <Stack spacing={5}>
              {[...Array(3)].map((val,index) => 
                  <Skeleton variant="rectangular" key={index} height="9vh" />
              )}
            </Stack>
          </Grid2>
        </Grid2>
      </>
    )
  }
  return (
    <>
    <Container maxWidth={"xl"} sx={{
      backgroundImage:`url(${img2})`,
      backgroundPosition:"center center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
    }}>
      <Box sx={{
        p:10,
        display:"flex",
        flexDirection:"column",
        flexWrap:"nowrap",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        height:"91.5vh",
      }}>
        <Typography sx={{
          textAlign:"center",
          fontSize:"1.5rem",
          fontWeight:"100",
          letterSpacing:"0.5rem",
          color:"common.white"
        }}>
          Latest on the blog
        </Typography>
        <Typography variant="subtitle1" sx={{
          textAlign:"center",
          fontSize:"2.9rem",
          fontFamily:"Lobster, serif",
          fontWeight:"400",
          fontStyle:"normal",
          color:"common.white",
          letterSpacing:"0.3rem",
        }}>
          The Title Of The Latest Blog On Photography 
        </Typography>
        <Button variant="outlined" onClick={()=>{
          navi("/blog");
        }} 
          sx={{
            width:"fit-content",
            color:"common.black",
            borderColor:"secondary.light",
            textTransform:"lowercase",
            pr:5,
            pl:5,
          }}>
            -view-
        </Button>
      </Box>
    </Container>
    <Divider />

    <Container maxWidth={"xl"} sx={{
        p:5,
        display:"flex",
        flexDirection:{md:"row", sm:"column"},
        flexWrap:"nowrap",
        justifyContent:{md:"space-around", sm:"space-between"},
        //alignContent:{md:"normal", sm:"space-between"},
        //alignItems:{md:"normal", xs:"space-between"}
      }}>
      <Box sx={{
        flexGrow:1,
        mr:{md:3, sm:0}
      }}>
        <Card sx={{
          borderRadius:2,
          mb:3
        }}>
          <CardMedia image={img1}
            title="Stock image of a woman using a laptop" 
            sx={{
              height:"350px",
              backgroundPosition:{md:"10% 10%", xs:"70% 50%"},
            }} />
          <CardContent>
            <Typography variant="body1" sx={{
              color:"#999",
              letterSpacing:"0.2rem",
              textTransform:"uppercase"
            }}>
              Tutorial
            </Typography>
            <Typography variant="subtitle1" component="a" onClick={()=>{
              navi("/blog");
            }}
              title="Blog example"
              sx={{
                color:"text.primary",
                textDecoration:"none",
                ":hover":{textDecoration:"underline"},
                cursor:"pointer",
            }}>
              How to Write Professional Emails -- Easy Guide
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography variant={"overline"} sx={{
            color:"primary.dark"
          }}>
            Most Popular
          </Typography>
        <Stack spacing={2}>

          {props.popularArticles.map((val,index)=> (
            <Paper key={index} sx={{
              p:2,
            }}>
              <Typography variant="body1" sx={{
                color:"#999",
                letterSpacing:"0.2rem",
                textTransform:"uppercase"
              }}>
                {val.category}
              </Typography>
              <Link to="/blog" >
                <Typography 
                title="Blog Example"
                variant='subtitle1' sx={{
                  textDecoration:"none",
                  color:"text.primary",
                  cursor:"pointer",
                  ":hover":{textDecoration:"underline"},
                }}>
                  {val.article}
                </Typography>
              </Link>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
    
    </>
  )
}

function Contacts() {
  let [open, setOpen] = useState(false);
  let navi = useNavigate();
  
  function handleOpening() {
    setOpen(true);
  }
  function handleClosing() {
    setOpen(false);
  };

  useEffect(()=> {
    
  },[])

  return (
    <>
    <Container maxWidth={"xl"} sx={{
      height:"89.5vh",
      display:"flex",
      flexDiretction:"column",
      flexWrap:"wrap",
      justifyContent:"center",
      alignContent:"center"
    }}>
      <Paper elevation={2} sx={{
        p:{md:15, xs:10}
        }}>
        <Typography variant="h4">
          Let's Talk
        </Typography>
        <Typography variant="h6" sx={{
          textIndent:{md:"10px", xs:0},
        }}>
          Send us an e-mail at 
          <Typography component="a" href="#email-pop-up" onClick={handleOpening} variant="body1" 
          sx={{
            display:"inline",
            ml:1,
            fontSize:{md:"1.3rem", xs:"1.1rem"},
            fontFamily:"Afacad, sans-serif",
            letterSpacing:"0.15rem",
            color:"secondary.light"
            }}>
            myAddress@gmail.com
          </Typography>
        </Typography>
      </Paper>
      <Modal 
      open={open} 
      onClose={handleClosing} 
      aria-labelledby='modal-text'
      aria-describedby='modal-desc' 
      sx={{
        display:"flex",
        flexDirection:"column",
        flexWrap:"wrap",
        justifyContent:"center",
        alignContent:"center",
      }}
      >
        
          <Box component="div" id="email-pop-up" sx={{
            display:"flex",
            flexDirection:"column",
            flexWrap:"nowrap",
            justifyContent:"center",
            alignContent:"center",
            textAlign:"center",
            p:15,
            width:"70%",
            //m:10,
            //height:"70%",
            bgcolor:"background.default"
          }}>
            <Button onClick={handleClosing} sx={{
                display:"inline",
                position:"absolute",
                top:"10%",
                right:"16%",
                alignItems:"center",
                pb:0,
                pl:0,pr:0
                //fontSize:"1.3rem"
                }}>
              <CloseRounded component="svg" />
            </Button>
              <Typography id="modal-text" variant="body1">
                Text In A Modal
              </Typography>
              <TextField id="name-field" type="text" label="Your Name" margin="normal" required />
              <TextField id="email-field" type="email" label="Your Email Address" margin="normal" required />
              <TextField id="message-field" type="text" label="message" placeholder='send me a message' required
              margin="normal" multiline minRows={4} helperText="these are placeholders only, no data is being sent" />
              <br/>
              <Box>
                <Button type='button' onClick={()=>{
                  navi("/contact/done");
                }}
                sx={{
                  bgcolor:"secondary.dark",
                  color:"common.black",
                  width:"40%",
                  
                }}>
                  Send
                </Button>
              </Box>
          </Box>
      </Modal>
    </Container>
    </>
  )
};

function ScrollToTop() {
  let location = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);
  return null;
}


function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("dark");

  function handleOpenNavMenu(e) {
    setAnchorEl(e.currentTarget);
  }
  

  const darkMode =  createTheme({
    palette:{
      mode:mode,
      primary:purple,
      secondary:cyan
    },
  });
  let navItems = [
    {name:"home", link:"/"}, {name:"about", link:"/about"}, 
    {name:"blog", link:"/blog"}, {name:"contacts", link:"/contact"}
  ];
  let popularArticles = [
    {category:"How to", article:"Overcoming Procastination - Tips And Tricks"},
    {category:"Cooking", article:"The Best Low-fat Meals on a budget"},
    {category:"Traveling", article:"Amazing Travel Guide - Visiting Italy"},
    {category:"Fitness", article:"Try These Excersies the Next Time You Hit the Gym"}
  ];
  let socialMediaIcons = [ 
    {icon: <GitHub/>, 
      ref:"https://github.com",
      title:"My Github page"
    } 
    , {icon: <LinkedIn/>,
      ref:"https://linkedin.com",
      title:"My Linkedin page"
    }, {icon: <Facebook/> ,
      ref:"https://facebook.com",
      title:"My Facebook page"
    }];

    
    useEffect(()=>{
      
      function hideProg() {
        let prog = document.getElementById("mui-prog");
        prog.style.display = "none";
        setLoading(false);
      }
      window.addEventListener("load", hideProg);
      return ()=> window.removeEventListener("load", hideProg);
    }
    ,[])

  return (
    <>
    <ThemeProvider theme={darkMode}>
      <CssBaseline enableColorScheme /> {/*global version of CSS Baseline, it's an API that changes CSS defaults*/}
      <GlobalStyles styles={(theme) => ({ //styles applied on body, h1,h2,h3 and other selectors
          //body: { backgroundColor:theme.palette.augmentColor, color:theme.palette.primary.main },
        })}/>
        <LinearProgress id="mui-prog"
        sx={{
            position:"absolute", 
            top:0,
            width:"100%"
            }}/>
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout mode={mode} setMode={setMode} navItems={navItems} />}>
              <Route index element={<Home loading={loading} socialMediaIcons={socialMediaIcons} popularArticles={popularArticles}/>} />
              <Route path="blog" element={<BlogOne loading={loading} image={imgBlog} />} />
              <Route path="contact" element={<Contacts/>} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Nopage/>} />
              <Route path="/contact/done" element={<Done/>} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer socialMediaIcons={socialMediaIcons} />

    </ThemeProvider>
    </>
  )
}

export default App
