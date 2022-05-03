import { Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {

    const history = useHistory()
    const {state} = useLocation<any>()

    return(
        <Container component={Paper}>
            {state?.error ? (
                <>
                <Typography variant='h3' color='error' gutterBottom>{state.error.title}</Typography>
                    <Divider />
                <Typography>{state.error.detail || 'Internal Server Error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>No Errors Here!</Typography>
            ) }
            <Button onClick={() => history.push('/catalog')}>Return to Store</Button>
        </Container>
    )
}