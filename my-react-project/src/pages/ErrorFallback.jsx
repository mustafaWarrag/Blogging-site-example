import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function ErrorFallback() {
  let navi = useNavigate()
  return (
    <Container sx={{height:"60vh"}} disableGutters>
      <Typography>Something went wrong :/</Typography>
      <Button onClick={()=>{
        navi("/");
      }}>
          Return To Homepage?
        </Button>
    </Container>
  )
}