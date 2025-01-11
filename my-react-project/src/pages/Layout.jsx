import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar, Menu, MenuItem, Drawer, ListItem, List, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Box, Typography } from "@mui/material";
import { StreamOutlined, ArrowDropDown ,WbSunny, DarkModeOutlined, DrawOutlined, LayersClear, MenuRounded } from "@mui/icons-material";
import { Container } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

let navItems = [
    {name:"home", link:"/"}, {name:"about", link:"/about"}, 
    {name:"blog", link:"/blog"}, {name:"contacts", link:"/contact"}
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
              display:{md:"inline",sm:"none"},
            }}
            >
              BLOG
            </Typography>

            </Box>

            {/* this is for mobile devices */}
            <MenuRounded onClick={()=>{
              DrawerToggle(true)
            }}
            sx={{
              display:{md:"none", sm:"inline"},
              verticalAlign:"-10%",
              textAlign:"right"
            }} />
            <Drawer id="drawer-appbar"
              open={drawerOpen}
              onClose={()=>{
                DrawerToggle(false)
              }}
              anchor='right'
              sx={{
                display:{md:"none",sm:"inline-flex"},
              }}>
                <List sx={{
                  p:3
                }}>
                  {navItems.map((val,index)=> (
                    val.name !== "blog" ?
                  <ListItem key={index}>
                    <Link to={val.link} 
                      onClick={()=>{
                        DrawerToggle(false);
                      }} >
                      <Typography sx={{
                        textTransform:"capitalize"
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
                        }}>{val.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                      sx={{
                        bgcolor:"common.black"
                      }}>
                        <Typography component="a" 
                        onClick={()=>{
                          navi("/blog"); 
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
                            p:1
                          }}
                          >
                          How to make your life healthier
                        </Typography>
                      <Typography variant="body1" sx={{
                        fontSize:"1.0rem",
                        mb:3,
                        pl:1
                      }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                      </Typography>
                          <Typography component={"a"} onClick={()=>{
                            navi("/blog"); 
                            handleClose();
                            DrawerToggle(false);
                              }
                            }
                            variant="h6" sx={{
                              color:"primary.main",
                              textDecoration:"underline",
                              fontWeight:700,
                              fontSize:{lg:"1.3rem", md:"1.0rem"},
                              p:1
                            }}>
                            The Easy Guide to Productivity and Training
                          </Typography>
                        <Typography variant="body1" sx={{
                        fontSize:"1.0rem",
                        mb:3,
                        pl:1
                      }}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit...
                        </Typography>
                      </AccordionDetails>
                      </Accordion>
                </ListItem>
                
                ))}
                </List>
            </Drawer>
            

            

            <Box sx={{
              flexGrow:0,
              flexShrink:{xl:1, sm:3},
              display:{md:"inline-flex", sm:"none"},
          }}>
            {navItems.map((val,index)=> (
              val.name !== "blog" ?
                <Link style={{textDecoration:"none"}} title={`My ${val.name}`}
                to={val.link} key={index}>
                <Button
                sx={{
                    display:"block",
                    m:1,
                    ml:{md:8,xs:3},
                    textTransform:"capitalize",
                    textDecoration:"none",
                    color:"primary.main",
                    fontSize:{md:"1rem", xs:"0.8rem"}
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
                ml:{md:8, xs:3},
                textTransform:"capitalize",
                textDecoration:"none",
                color:"primary.main",
                fontSize:{md:"1rem", xs:"0.8rem"}
                //borderColor:"secondary.dark"
            }}
              >
                Blog 
                <ArrowDropDown component="svg" 
                sx={{
                  display:"inline", 
                  m:0,
                  fontSize:{md:"1.3rem", xs:"1.0rem"},
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
                  bgcolor:"common.black",
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
                  navi("/blog"); 
                  handleClose()
                    }
                  } 
                  variant="h6">
                  How to make your life healthier
                </Typography>
              </MenuItem>
              <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </Typography>
                <MenuItem>
                  <Typography component={"a"} onClick={()=>{
                    navi("/blog"); 
                    handleClose()
                      }
                    }
                    variant="h6">
                    The Easy Guide to Productivity and Training
                  </Typography>
                </MenuItem>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </Typography>
            </Menu>
            </span>
            ))}
            
            <Box component="span" sx={{
              alignContent:"center", 
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