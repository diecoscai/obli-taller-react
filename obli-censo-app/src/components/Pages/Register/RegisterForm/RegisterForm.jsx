import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { fetchRegister } from '../../../../api/censoAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import logo from '../../../../logo.png';

const RegisterFrom = () => {
    //Variables and States
    const inputUserName = useRef();
    const inputPassword = useRef();
    const dispatch = useDispatch();
    //Color for signUp button
    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    const theme = createTheme({
        palette: {
            yellowButton: createColor('#FFD25E'),
        },
    });

    //Handler Register
    const onHandleRegister = (e) => {
        e.preventDefault();
        console.log('USER DATA:' + inputUserName.current.value, inputPassword.current.value);
        if (inputUserName.current.value === '' || inputPassword.current.value === '') {
            <Snackbar autoHideDuration={6000} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    No puede haber campos vacios!
                </Alert>
            </Snackbar>
        } else {
            fetchRegister(inputUserName.current.value, inputPassword.current.value)
                .then(response => {
                    if (response.status === 200) {
                        <Snackbar autoHideDuration={6000} >
                            <Alert severity="success" sx={{ width: '100%' }}>
                                Bienvenido al censo!
                            </Alert>
                        </Snackbar>
                    }
                })
                .catch(error => {
                    if (error.status === 409) {
                        <Snackbar autoHideDuration={6000} >
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {error.message}
                            </Alert>
                        </Snackbar>
                    }
                });
        }
    }

    return (
        <>
            <form>
                <ThemeProvider theme={theme}>
                    <Box
                        display='flex'
                        flexDirection={"column"}
                        maxWidth={400}
                        alignItems={"center"}
                        justifyContent={"center"}
                        margin="auto"
                        marginTop={25}
                        padding={3}
                        borderRadius={5}
                        boxShadow={'5px 5px 10px #ccc'}
                        minHeight="50vh"
                        sx={{
                            ":hover": {
                                boxShadow: '5px 5px 10px #aaa'
                            }
                        }}>

                        <img src={logo} width="70" height="70" alt="Logo" />
                        <Typography variant={"h4"} color={"primary"} align={"center"} >Sign Up:</Typography>
                        <TextField
                            margin='normal'
                            type={'text'}
                            variant='outlined'
                            placeholder='Name'
                            ref={inputUserName}
                        />
                        <TextField
                            margin='normal'
                            type={'text'}
                            variant='outlined'
                            placeholder='Password'
                            ref={inputPassword}
                        />
                        <Button
                            variant="contained"
                            color="yellowButton"
                            sx={{
                                marginTop: 5,
                                borderRadius: 2,
                                boxShadow: '2px 2px 5px #ccc',
                                fontWeight: 'bold',
                                textShadow: '2px 2px 5px #555549',

                            }}
                            onClick={onHandleRegister}>
                            <Typography variant={"p"} color={"white"} align={"center"}>Sign Up!</Typography>
                        </Button>
                    </Box>
                </ThemeProvider>
            </form >
        </>
    )
}

export default RegisterFrom