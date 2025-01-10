import { CheckBoxOutlined } from "@mui/icons-material";
import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Done() {
    let navi = useNavigate();
    return (
        <Container maxWidth="xl" sx={{height:"85vh",p:1}}>
            <Paper elevation={3} sx={{p:5}}>
                <Typography>
                    Done! <CheckBoxOutlined sx={{verticalAlign:"-18%"}}/>
                </Typography>
                <Typography component="a" title="return to home page" onClick={()=>{
                    navi("/");
                }}
                    sx={{
                    color:"secondary.main",
                    textDecoration:"underline",
                    cursor:"pointer"
                    }}>
                Return to Homepage
                </Typography>
            </Paper>
        </Container>
    )
}