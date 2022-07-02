
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom'

import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@material-ui/lab';
import { useAppDispatch } from '../../app/store/configureStore';

import { signInUser } from './accountSlice';



const theme = createTheme();

export default function Login() {

    const history = useHistory()
    const location = useLocation<any>()
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data))

            history.push('/catalog')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">


                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        {...register('username', { required: 'Username is required' })}
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', { required: 'password is required' })}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!isValid}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to="/register">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </ThemeProvider>
    );
}