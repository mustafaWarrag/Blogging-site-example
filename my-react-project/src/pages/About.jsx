import { Box, Card, CardMedia, Container, Typography } from "@mui/material";
import imgAbout1 from "../images/man-with-headset.jpg"
import imgAbout2 from "../images/two-women-talking.jpg"
import imgAbout3 from "../images/woman-holding-tablet.jpg"
import { useEffect } from "react";

let imgArray = [imgAbout1, imgAbout2, imgAbout3];
let headerArray = [
    "Dedicated And Friendly", "Multi-talented and Innovative", "Our Strengths Come from Our Connectedness"
];
let titlesArray = ["man wearing a headset", "two women talking", "a woman holding a tablet"]

export default function About(props) {
    useEffect(()=>{
        document.title = "About";
    },[])
    return (
        <Container maxWidth="xl" sx={{p:5}}>
            <Box sx={{textAlign:"center", mb:3}}>
                <Typography variant="h3">
                    About The Team
                </Typography>
            </Box>
            {/*
            <Box sx={{
                display:"flex",
                flexDirection:"row",
                flexWrap:"wrap", 
                justifyContent:"space-between",
                p:10,
                pt:0,
                pb:0
                }}>
                <Card sx={{flexGrow:1, mr:2}}>
                    <CardMedia image={props.img1} sx={{height:"50vh"}} />
                </Card>
                <Box sx={{flexBasis:"400px"}}>
                    <Typography variant="h6" >
                        Dedicated and Friendly
                    </Typography>
                    <Typography variant="body1" sx={{fontSize:"1.3rem", fontWeight:"300"}} >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim possimus quaerat est molestiae, magnam sunt veritatis vel accusamus consectetur, odit nesciunt non.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim possimus quaerat est molestiae, magnam sunt veritatis vel accusamus consectetur, odit nesciunt non.
                    </Typography>
                </Box>
            </Box>
                */}

            {headerArray.map((val,index) => 
                index % 2 === 0 ?
                <Box key={index} sx={{
                    display:"flex",
                    flexDirection:{md:"row", sm:"column"},
                    flexWrap:"wrap", 
                    justifyContent:"space-between",
                    alignItems:{md:"center", sm:"normal"},
                    p:{lg:8, md:7, sm:3},
                    pt:0,
                    pb:0,
                    mb:{lg:7, md:4, sm:3}
                    }}>
                    <Card sx={{flexGrow:{lg:1, md:2, sm:2}, mr:{lg:2, md:2}}}>
                        <CardMedia image={imgArray[index]} title={titlesArray[index]} 
                        sx={{
                            height:{md:"60vh", sm:"70vh"}
                            }} />
                    </Card>
                    <Box sx={{
                        flexBasis:{lg:"400px", md:"270px"}
                        }}>
                        <Typography variant="h6" >
                            {val}
                        </Typography>
                        <Typography variant="body1" sx={{fontSize:"1.3rem", fontWeight:"300"}} >
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim possimus quaerat est molestiae, magnam sunt veritatis vel accusamus consectetur, odit nesciunt non.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim possimus quaerat est molestiae, magnam sunt veritatis vel accusamus consectetur, odit nesciunt non.
                        </Typography>
                    </Box>
                </Box>
                :
                <Box key={index} sx={{
                    display:"flex",
                    flexDirection:{md:"row-reverse", sm:"column-reverse"},
                    flexWrap:"wrap", 
                    justifyContent:{md:"space-between", sm:"space-around"},
                    alignItems:{md:"center", sm:"normal"},
                    alignContent:{md:"center", sm:"space-between"},
                    p:{lg:8, md:7, sm:3},
                    pt:0,
                    pb:0,
                    mb:{lg:7, md:4, sm:3}
                    }}>
                    <Card sx={{flexGrow:{lg:1, md:2}, ml:{lg:2,md:0}}}>
                        <CardMedia image={imgArray[index]} title={titlesArray[index]} sx={{height:"60vh"}} />
                    </Card>
                    <Box sx={{
                        flexBasis:{lg:"400px", md:"270px"}
                    }}>
                        <Typography variant="h6" >
                            {val}
                        </Typography>
                        <Typography variant="body1" sx={{fontSize:"1.3rem", fontWeight:"300"}} >
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim possimus quaerat est molestiae, magnam sunt veritatis vel accusamus consectetur, odit nesciunt non.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim possimus quaerat est molestiae, magnam sunt veritatis vel accusamus consectetur, odit nesciunt non.
                        </Typography>
                    </Box>
                </Box>
            )}
        </Container>
    )
}