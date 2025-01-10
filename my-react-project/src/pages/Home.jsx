import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Button, AppBar, Toolbar, Menu, MenuItem, Card, CardMedia, CardContent, Stack } from '@mui/material';
import { Box, Typography, Paper, Divider, ButtonGroup } from "@mui/material";
import { StreamOutlined, Facebook, LinkedIn, GitHub } from "@mui/icons-material";
import { Container, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import img1 from "./images/young-woman-laptop-window.jpg";
import img2 from "./images/woman-holding-camera-2.jpeg";


function Home() {
 

  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpenNavMenu(e) {
    setAnchorEl(e.currentTarget);
  }
  

  const darkMode =  createTheme({
    palette:{
      mode:"dark",
    },
  });
  let navItems = ["home", "about", "blog", "contacts"];
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

  return (
    <>
    <ThemeProvider theme={darkMode}>
      <CssBaseline enableColorScheme /> {/*global version of CSS Baseline, it's an API that changes CSS defaults*/}
      <GlobalStyles styles={(theme) => ({ //styles applied on body, h1,h2,h3 and other selectors
          //body: { backgroundColor:theme.palette.augmentColor, color:theme.palette.primary.main },
        })}/>

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
            letterSpacing:"0.5rem"
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
            Title Of Latest Blog Regarding Esoteric Problem 
          </Typography>
          <Button variant="outlined" sx={{
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
          flexDirection:"row",
          justifyContent:"space-around",
        }}>
        <Box sx={{
          flexGrow:1,
          mr:3
        }}>
          <Card sx={{
            borderRadius:2,
          }}>
            <CardMedia image={img1}
              title="Stock image of a woman using a laptop" 
              sx={{
                height:"350px",
                backgroundPosition:"10% 10%",
              }} />
            <CardContent>
              <Typography variant="body1" sx={{
                color:"#999",
                letterSpacing:"0.2rem",
                textTransform:"uppercase"
              }}>
                Tutorial
              </Typography>
              <Typography variant="subtitle1" component="a"
                href="#article" 
                sx={{
                  color:"common.white",
                  textDecoration:"none",
                  ":hover":{textDecoration:"underline"}
              }}>
                How to Write Professional Emails -- Easy Guide
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Typography variant={"overline"} sx={{
              color:"primary.dark",
            }}>
              Most Popular
            </Typography>
          <Stack spacing={2}>

            {popularArticles.map((val,index)=> (
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
                <Typography component="a" href="#article"
                variant='subtitle1' sx={{
                  textDecoration:"none",
                  color:"common.white",
                  ":hover":{textDecoration:"underline"},
                }}>
                  {val.article}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Container>

      <Container maxWidth="xl" disableGutters id="about"
      sx={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        bgcolor:"common.black",
        p:1,
        borderTop:"2px solid",
        borderTopColor:"primary.dark"
      }}>
        <Typography variant="body1" sx={{
          textAlign:"left",
          fontWeight:"300",
          mr:0
        }}>
           &copy; 2025 Mustafa Warrag
        </Typography>
        <Typography variant="body1" sx={{
          fontWeight:"300"
        }}>
          A Front-end Developer
        </Typography>
        <ButtonGroup aria-label="Basic button group">
          {socialMediaIcons.map((val,ind)=>(
            <Button key={ind} title={val.title} href={val.ref} target="_blank"
            sx={{
              color:"primary.dark"
            }}>
              {val.icon}
            </Button>
          ))}
        </ButtonGroup>
      </Container>

    </ThemeProvider>
    </>
  )
} export default Home