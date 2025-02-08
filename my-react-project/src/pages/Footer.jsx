import { Container, Typography, Button, ButtonGroup } from "@mui/material"

export default function Footer(props) {
    return (
        <Container maxWidth="xl" disableGutters component="div" id="about"
        sx={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          alignContent:"center",
          alignItems:"center",
          //bgcolor:"common.white",
          p:1,
          borderTop:"2px solid",
          borderTopColor:"primary.dark"
        }}>
            
          <Typography variant="body1" sx={{
            textAlign:"left",
            fontWeight:"300",
            color:"text.primary",
            mr:0
          }}>
             &copy; 2025 Mustafa Warrag
          </Typography>
          <Typography variant="body1" sx={{
            fontWeight:"300",
            color:"text.primary",
            textAlign:"center",
            mr:3
            //flexGrow:{md:0, xs:1}
          }}>
            A Web Developer
          </Typography>
          <ButtonGroup aria-label="Basic button group" sx={{mr:2}}>
            {props.socialMediaIcons.map((val,ind)=>(
              <Button key={ind} title={val.title} href={val.ref} target="_blank"
              sx={{
                color:"primary.dark"
              }}>
                {val.icon}
              </Button>
            ))}
          </ButtonGroup>
        </Container>
        
    )
}