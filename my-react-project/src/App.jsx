import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { LinkedIn, GitHub } from "@mui/icons-material";
import { LinearProgress, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, cyan } from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import img1 from "./images/young-woman-laptop-window.jpg";
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
import Profile from './pages/Profile.jsx';
import CreateBlog from './pages/CreateBlog.jsx';

import blogRequests from './requests/blogRequests.js';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from './features/userSlice.js';
import userRequests from './requests/userRequests.js';

function ScrollToTop() {
  let location = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);
  return null;
}

function App() {
  const [anchorEl, setAnchorEl] = useState(null); //state for managing the 
  const [loading, setLoading] = useState(true); //state for managing whether the component has finished laoding
  const [mode, setMode] = useState("dark"); //state for managing dark/light mode
  
  const [info, setInfo] = useState([ //state for managing the data fetched from the backend
    {
    _id:"000",
    tags:["blog"],
    title:" Lorem ipsum dolor sit amet consectetur",
    content:"lorem lorem lorem",
    img:img1
    }
]);
  //const [open, setOpen] = useState(false);

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
      setLoading(false);
    }
    
    function grabBlogs() {
      setLoading(true);
      blogRequests.fetchAllBlogs().then((response) => {
        //console.log(response.data.blogs);
        //let data = response.data.blogs.sort(()=> Math.random()-0.5);
        setInfo(response.data.blogs.sort(()=> Math.random()-0.5));
      }).catch((err)=>{
        console.error(err);
      }).finally(()=>{
        setLoading(false);
      })
    }
    
    let dispatch = useDispatch();
    
    

    function checkStorage() {
      let cookie = JSON.parse(localStorage.getItem("cookie"));
      if (cookie) {
        //check if the cache token hasn't expired
        userRequests.tokenAuthentication(cookie.token).then((response)=>{
          console.log("grabbing from cache");
          console.log(cookie);
          dispatch(setUser({
            username:cookie.username,
            token:cookie.token
            }))
        }).catch((err)=> {
          console.error("bad token" + err);
          //if token is invalid, logout and clear storage
          dispatch(logout());
          localStorage.clear();
        })
      } else {
        //if there was no cache to begin with
        console.log("cache not found");
      }
    }

    const token = useSelector((store) => store.info.token);


    useEffect(()=>{
      grabBlogs();
      checkStorage();
    }
    ,[])

  return (
    <>
    <ThemeProvider theme={darkMode}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={(theme) => ({
          //body: { backgroundColor:theme.palette.augmentColor, color:theme.palette.primary.main },
        })}/>
        {loading && <LinearProgress id="mui-prog" sx={{
                position:"absolute", 
                top:0,
                width:"100%"}}
              />
        }
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
              {/* <Route path="/signup" element={<SignUp open={open} setOpen={setOpen} />} /> */}
              <Route path="categories" element={<Categories />} />
              <Route path="profile" element={<Profile />} />
              <Route path="create-blog" element={<CreateBlog />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer socialMediaIcons={socialMediaIcons} />

    </ThemeProvider>
    </>
  )
}

export default App
