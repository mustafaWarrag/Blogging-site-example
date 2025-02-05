import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar, Menu, MenuItem, Drawer, ListItem, List, Accordion, AccordionSummary, AccordionDetails, Skeleton } from '@mui/material';
import { Box, Typography } from "@mui/material";
import { StreamOutlined, ArrowDropDown ,WbSunny, DarkModeOutlined, MenuRounded } from "@mui/icons-material";
import { Container } from '@mui/material';

import Login from './Login.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/userSlice.js';

let navItems = [
    {name:"home", link:"/"}, {name:"categories", link:"/categories"}, 
    {name:"blog", link:"/blog"}, {name:"contacts", link:"/contact"},
    {name:"about", link:"/about"}
];

function SwitchMode(props) {
  if (props.mode === "light") {
    return (
      <WbSunny htmlColor="#121212" sx={{verticalAlign:"-8%"}} />
    )
  } else if (props.mode === "dark") {
    return <DarkModeOutlined htmlColor="#91f" sx={{verticalAlign:"-8%"}} />
  }
}

function Layout(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  let [drawerOpen, setDrawer] = useState(false);
  let opened = Boolean(anchorEl);
  let navi = useNavigate();
  
  const [open, setOpen] = useState(false); //state for managing the sign-up modal
  
  const username = useSelector((store) => store.info.username);
  const dispatch = useDispatch()
  
  function handleClose() {
    setAnchorEl(null);
  }

  function handleHover(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleMouseLeave(e) {
    opened = false;
    setAnchorEl(null);
  }

  function DrawerToggle(bool) {
    setDrawer(bool);
  }

  useEffect(()=> {
    window.addEventListener("scroll", handleMouseLeave);
    return ()=> window.removeEventListener("scroll", handleMouseLeave);
  }
  ,[])

  if (props.loading) {
    return (
      <>
        <Skeleton variant="rectangular" height="9vh" />
        <Outlet />
      </>
    )
  }


    return (
 <>
    <AppBar position='static' 
    sx={{
      backgroundImage:"none", 
      bgcolor:"background.default"
      }}>
    <Toolbar disableGutters>
      <Container maxWidth={"xl"} sx={{
        display:"flex",
        justifyContent:{md:"space-between", xs:"space-between"},
        alignContent:"center",
        alignItems:"center"
      }}>
          <Box sx={{
            m:1,
            ml:0,
          }}>
            <StreamOutlined htmlColor="#91f" sx={{
              fontSize:{md:"1.5rem", xs:"1.2rem"},
              mr:1,
              verticalAlign:"-8%",
              }} />
            <Typography variant='h5' noWrap
            sx={{
              textDecoration:"none",
              color:"text.primary",
              letterSpacing:"0.5rem",
              fontSize:{md:"1.5rem", xs:"1.2rem"},
              mr:{md:2, sm:0},
              display:{md:"inline",sm:"none", xs:"none"},
            }}
            >
              BLOG
            </Typography>

            </Box>

            {/* this is for mobile devices */}
            <MenuRounded htmlColor='#91f' onClick={()=>{
              DrawerToggle(true)
            }}
            sx={{
              display:{md:"none", sm:"inline"},
              verticalAlign:"-10%",
              textAlign:"right",
              color:"text.dark"
            }} />
            <Drawer id="drawer-appbar"
              open={drawerOpen}
              onClose={()=>{
                DrawerToggle(false)
              }}
              anchor='right'
              sx={{
                display:{md:"none",sm:"inline-flex"}
              }}
              
              PaperProps={{
                sx:{
                    bgcolor:"common.main",
                    backgroundImage:"none"
                }
              }}>
                <List sx={{
                  p:3
                }}>
                  {navItems.map((val,index)=> (
                    val.name !== "blog" ?
                  <ListItem key={index}>
                    <Link to={val.link} style={{
                        textDecoration:"none",
                    }}  
                      onClick={()=>{
                        DrawerToggle(false);
                      }} >
                      <Typography sx={{
                        textTransform:"capitalize",
                        color:"secondary.main"
                      }}>{val.name}
                      </Typography>
                    </Link>
                  </ListItem>
                  :
                  <ListItem key={index} sx={{pl:1}}>
                    <Accordion
                    sx={{
                          bgcolor:"transparent",
                          backgroundImage:"none",
                          boxShadow:"none",
                          border:"1px solid #121212"
                    }}>
                      <AccordionSummary  
                      id="accordian-blog" 
                      expandIcon={ <ArrowDropDown />}
                      sx={{pl:1}}
                      >
                        <Typography sx={{
                          textTransform:"capitalize",
                          color:"secondary.main"
                        }}>{val.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                      sx={{
                        bgcolor:"background.default",
                        p:2
                      }}>
                        <Typography component="a" 
                        onClick={()=>{
                          navi(`/blog/id/${props.info[0]._id}`); 
                          handleClose();
                          DrawerToggle(false);
                            }
                          } 
                          variant="h6"
                          sx={{
                            color:"primary.main",
                            textDecoration:"underline",
                            fontWeight:700,
                            fontSize:{lg:"1.3rem", md:"1.0rem"},
                            p:1,
                            cursor:"pointer"
                          }}
                          >
                          {props.info[0].title}
                        </Typography>
                      <Typography variant="body1" sx={{
                        fontSize:"1.0rem",
                        mb:3,
                        pl:1,
                        textOverflow:"ellipsis"
                      }}>
                        {props.info[0].content.slice(0, 30)}...
                      </Typography>
                          <Typography component={"a"} onClick={()=>{
                            navi(`/blog/id/${props.info[1]._id}`); 
                            handleClose();
                            DrawerToggle(false);
                              }
                            }
                            variant="h6" 
                            sx={{
                              color:"primary.main",
                              textDecoration:"underline",
                              fontWeight:700,
                              fontSize:{lg:"1.3rem", md:"1.0rem"},
                              p:1,
                              cursor:"pointer"
                            }}>
                            {props.info[1].title}
                          </Typography>
                        <Typography variant="body1" sx={{
                        fontSize:"1.0rem",
                        mb:3,
                        pl:1,
                        textOverflow:"ellipsis"
                      }}>
                          {props.info[1].content.slice(0, 30)}...
                        </Typography>
                      </AccordionDetails>
                      </Accordion>
                </ListItem>
                
                ))}
                <ListItem>
                  {username?  (
                    <Button onClick={()=>{
                      navi("/profile");
                      setDrawer(false);
                    }} 
                    sx={{
                      color:"text.primary",
                      ml:"-9px"
                    }}>
                      Profile
                    </Button>
                  ) : (
                    <Button sx={{
                      color:"text.primary",
                      ml:"-9px"
                    }} 
                    onClick={()=>{
                      setOpen(true);
                      setDrawer(false);
                    }}>Login
                    </Button>
                  )}
                  </ListItem>

                <ListItem>
                  <Box component="span" sx={{
                      alignContent:"left",
                      ml:0,
                      cursor:"pointer"
                    }} 
                    onClick={()=>{
                      if (props.mode === "dark") {
                        props.setMode("light")
                    } else if (props.mode === "light") {
                      props.setMode("dark");
                    }
                    }} >
                      <SwitchMode mode={props.mode} />
                  </Box>
                </ListItem>
                </List>
            </Drawer>
            

            
            {/* This is for laptop and desktop screens */}
            <Box sx={{
              flexGrow:0,
              flexShrink:{xl:1, md:3},
              display:{md:"inline-flex", sm:"none", xs:"none"},
              }}>
                  {username?  (
                    <Button onClick={()=>{
                      navi("/profile")
                    }} 
                    sx={{
                      color:"text.primary",
                      m:1, mr:0, ml:"-9px",
                      fontSize:{lg:"1.0rem", md:"0.8rem"}
                    }}>
                      Profile
                    </Button>
                  ) : (
                    <>
                      <Button sx={{color:"text.primary"}}
                      onClick={()=>{
                        setOpen(true);
                      }}>Login</Button>
                      <Login open={open} setOpen={setOpen} />
                    </>
                  )}
            {navItems.map((val,index)=> (
              val.name !== "blog" ?
                <Link style={{textDecoration:"none"}} title={`My ${val.name}`}
                to={val.link} key={index}>
                <Button
                sx={{
                    display:"block",
                    m:1,
                    ml:{xl:8,md:4},
                    textTransform:"capitalize",
                    textDecoration:"none",
                    color:"primary.main",
                    fontSize:{lg:"1rem", md:"0.8rem"}
                    //borderColor:"secondary.dark"
                }}
                variant="text"
                >{val.name}
                </Button>
              </Link> 
              : 
              <span key={index}>
              <Button
              title="blogs"
              variant="text"
              id="basic-button"
              aria-controls={opened ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={opened ? "true" : undefined}
              onMouseEnter={handleHover}

              sx={{
                display:"block",
                m:1,
                ml:{xl:8, md:4},
                textTransform:"capitalize",
                textDecoration:"none",
                color:"primary.main",
                fontSize:{lg:"1rem", md:"0.8rem"}
                //borderColor:"secondary.dark"
            }}
              >
                Blog 
                <ArrowDropDown component="svg" 
                sx={{
                  display:"inline", 
                  m:0,
                  fontSize:{lg:"1.3rem", md:"1.0rem"},
                  verticalAlign:"middle"
                  }} />
            </Button>
            <Menu 
              id="basic-menu"
              open={opened}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical:"bottom",
                horizontal:"right",
              }}
              disableScrollLock
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
                onMouseLeave:handleClose,
                onScroll:handleClose
              }}
              sx={{
                "& ul": {
                  bgcolor:"background.default",
                  border:"2px solid",
                  borderColor:"primary.main",
                  p:{lg:3, md:1}
                }
              }}
              slotProps={{
                paper:{
                  sx:{
                    "& li.MuiMenuItem-root": {
                      //bgcolor:"primary.dark"
                  },
                    "& .MuiTypography-overline": {
                      color:"text.light",
                      fontSize:{lg:"1.05rem", md:"0.8rem"},
                      p:0,
                      pl:{md:0, sm:1},
                    }, "& .MuiMenuItem-root": {
                      //p:3
                        display:"block",
                        p:0,
                        mb:1,
                        //":hover":{bgcolor:"common.black", textDecoration:"underline"}
                    }, "& .MuiTypography-body1": {
                        fontSize:{lg:"1.0rem", md:"0.8rem"},
                        mb:3,
                        pl:1
                        
                    }, "& .MuiTypography-h6": {
                      textDecoration:"none",
                      color:"primary.main",
                      fontWeight:700,
                      fontSize:{lg:"1.3rem", md:"1.0rem"},
                      p:1
                    }
                }
              }
              }} 
              >
                <Typography variant="overline">
                  Featured Blogs
                </Typography>
              
              <MenuItem>
                <Typography component="a" onClick={()=>{
                  navi(`/blog/id/${props.info[0]._id}`); 
                  handleClose()
                    }
                  } 
                  variant="h6">
                  {props.info[0].title}
                </Typography>
              </MenuItem>
              <Typography variant="body1">
                {props.info[0].content.slice(0, 30)}...
                </Typography>
                <MenuItem>
                  <Typography component={"a"} onClick={()=>{
                    navi(`/blog/id/${props.info[1]._id}`); 
                    handleClose()
                      }
                    }
                    variant="h6">
                    {props.info[1].title}
                  </Typography>
                </MenuItem>
                <Typography variant="body1">
                  {props.info[1].content.slice(0, 30)}...
                </Typography>
                {username && <Button type="button" onClick={()=>{
                  navi("/create-blog")
                }}
                sx={{
                  textAlign:"center",
                  width:"100%",
                  bgcolor:"secondary.main",
                  color:"text.primary"
                }} >
                  Create Blog
                  </Button>}
            </Menu>
            </span>
            ))}
            
            <Box component="span" sx={{
              alignContent:"center",
              alignItems:"center",
              ml:3,
              cursor:"pointer"
            }} 
            onClick={()=>{
              if (props.mode === "dark") {
                props.setMode("light")
            } else if (props.mode === "light") {
              props.setMode("dark");
            }
            }} >
              <SwitchMode mode={props.mode} />
            </Box>
          </Box>
      </Container>
    </Toolbar>
  </AppBar>
  <Outlet />
 </>
)
} 
export default Layout