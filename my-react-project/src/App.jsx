import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Facebook, LinkedIn, GitHub } from "@mui/icons-material";
import { LinearProgress, CssBaseline, GlobalStyles } from '@mui/material';
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
import Home from './pages/Home.jsx';
import BlogOne from './pages/BlogOne.jsx';
import Nopage from './pages/Nopage.jsx';
import Footer from './pages/Footer.jsx';
import About from './pages/About.jsx';
import Done from './pages/Done.jsx';
import BlogById from './pages/BlogById.jsx';
import Contacts from './pages/Contacts.jsx';
import Categories from './pages/Categories.jsx';

import blogService from './services/blogService.js';




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
  
  const [info, setInfo] = useState([
    {
    _id:"000",
    tags:["blog"],
    title:" Lorem ipsum dolor sit amet consectetur",
    content:"lorem lorem lorem",
    img:img1
    }
])

  function grabBlogs() {
    blogService.fetchAllBlogs().then((response) => {
      //console.log(response.data.blogs);
      //let data = response.data.blogs.sort(()=> Math.random()-0.5);
      setInfo(response.data.blogs.sort(()=> Math.random()-0.5));
      hideProg();
    }).catch((err)=>{
      console.error(err);
    })
  }

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
  let socialMediaIcons = [ 
    {icon: <GitHub/>, 
      ref:"https://github.com/mustafaWarrag",
      title:"My Github page"
    } 
    , {icon: <LinkedIn/>,
      ref:"https://linkedin.com/in/mustafa-warrag-90858a323",
      title:"My Linkedin page"
    }];

    function hideProg() {
      let prog = document.getElementById("mui-prog");
      prog.style.display = "none";
      setLoading(false);
    }
    
    useEffect(()=>{
      grabBlogs();

      //window.addEventListener("load", hideProg);
      //return ()=> window.removeEventListener("load", hideProg);
    }
    ,[])

  return (
    <>
    <ThemeProvider theme={darkMode}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={(theme) => ({
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
            <Route path="/" element={<Layout mode={mode} setMode={setMode} info={info} loading={loading} />}>
              <Route index element={<Home loading={loading} socialMediaIcons={socialMediaIcons} info={info} />} />
              <Route path="blog" element={<BlogOne loading={loading} image={imgBlog} />} />
              <Route path="blog/id/:id" element={<BlogById />} />
              <Route path="contact" element={<Contacts />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Nopage/>} />
              <Route path="/contact/done" element={<Done/>} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer socialMediaIcons={socialMediaIcons} />

    </ThemeProvider>
    </>
  )
}

export default App
