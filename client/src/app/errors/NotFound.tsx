import { Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


export default function NotFound() {

    return (
        <Container component={Paper} sx={{height:400}}>
            <Typography gutterBottom variant='h3'>
                Oops... We couldn't find the page you are looking for!
            </Typography>
            <Divider />
            <Button fullWidth component={Link} to='/catalog'> Return to Store </Button>
        </Container>
    )
}