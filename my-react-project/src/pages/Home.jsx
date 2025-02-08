import { Link, } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardMedia, CardContent, Stack } from '@mui/material';
import { Box, Typography, Paper, Divider, Grid2, Skeleton } from "@mui/material";
import { Container} from '@mui/material';

import img1 from "../images/young-woman-laptop-window.jpg";
import img2 from "../images/woman-holding-camera-2.jpeg";
import { useEffect } from "react";

export default function Home(props) {
  let navi = useNavigate();
  useEffect(()=>{
    document.title = "Home"
  },[]);

  if (props.loading) {
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
      backgroundImage:`url(${props.info[0].img?props.info[0].img : img2})`,
      backgroundPosition:"center center",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      backgroundColor:"#555",
      backgroundBlendMode:"overlay",
    }}>
      <Box sx={{
        p:10,
        display:"flex",
        flexDirection:"column",
        flexWrap:"nowrap",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        height:"84.5vh",
      }}>
        <Typography sx={{
          textAlign:"center",
          fontSize:"1.9rem",
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
          {props.info[0].title}
        </Typography>
        <Button variant="outlined" onClick={()=>{
          navi(`/blog/id/${props.info[0]._id}`);
        }} 
          sx={{
            width:"fit-content",
            color:"common.white",
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
        flexWrap:{md:"nowrap", xs:"wrap"},
        justifyContent:{md:"space-around", sm:"space-between", xs:"space-between"},
        //alignItems:{xs:"center"}
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
          <CardMedia image={props.info[5].img? props.info[5].img : img1}
            title="Stock image" 
            sx={{
              height:"350px",
              backgroundPosition:{md:"10% 10%", xs:"center center"},
            }} />
          <CardContent>
            <Typography variant="body1" sx={{
              color:"#999",
              letterSpacing:"0.2rem",
              textTransform:"uppercase"
            }}>
              {props.info[5].tags[0]}
            </Typography>
            <Typography variant="subtitle1" component="a" onClick={()=>{
              navi(`/blog/id/${props.info[5]._id}`);
            }}
              title="Blog example"
              sx={{
                color:"text.primary",
                textDecoration:"none",
                ":hover":{textDecoration:"underline"},
                cursor:"pointer",
            }}>
              {props.info[5].title}
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

          {props.info.slice(1,5).map((val,index)=> (
            <Paper key={index} sx={{
              p:2,
            }}>
              <Typography variant="body1" sx={{
                color:"#999",
                letterSpacing:"0.2rem",
                textTransform:"uppercase"
              }}>
                {val.tags[0]}
              </Typography>
              <Link to={`/blog/id/${val._id}`} >
                <Typography 
                title="Blog Example"
                variant='subtitle1' sx={{
                  textDecoration:"none",
                  color:"text.primary",
                  cursor:"pointer",
                  ":hover":{textDecoration:"underline"},
                }}>
                  {val.title}
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