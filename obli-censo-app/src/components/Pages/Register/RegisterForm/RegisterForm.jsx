import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { fetchRegister } from '../../../../api/censoAPI'
import { useState } from 'react';
import logo from '../../../../logo.png';
import CustomizedAlert from '../../../UI/CustomizedAlert/CustomizedAlert';

const RegisterFrom = () => {
    //Variables and States
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    //Color for signUp button
    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    const theme = createTheme({
        palette: {
            yellowButton: createColor('#2c3d5e'),
        },
    });

    const _onHandleChangeUser = (e) => { setUser(e.target.value); }
    const _onHandleChangePass = (e) => { setPassword(e.target.value); }

    //Handler Register
    const onHandleRegister = (e) => {
        e.preventDefault();
        console.log('USER DATA:' + user, password);
        if (user === '' || password === '') {
            setMessage('No pueden haber campos vacios!');
            setError(true);
        } else {
            fetchRegister(user, password)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.mensaje);
                        setMessage(response.mensaje);
                        setError(true);
                    }
                })
                .catch(error => {
                    if (error.status === 409) {
                        console.log(error.mensaje);
                        setMessage(error.mensaje);
                        setError(true);
                    }
                });
                setError(false);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                {error ? <CustomizedAlert message={message} /> : null}
                {message && (
                    <Typography
                        variant="body1"
                        color={error ? 'error' : 'success'}
                        align="center"
                        sx={{ marginBottom: 10 }}
                    >
                        {message}
                    </Typography>
                )}
                
                <Box
                    display="flex"
                    flexDirection="column"
                    maxWidth={400}
                    alignItems="center"
                    justifyContent="center"
                    margin="auto"
                    marginTop={25}
                    padding={3}
                    borderRadius={5}
                    boxShadow="5px 5px 10px #ccc"
                    minHeight="50vh"
                    sx={{
                        ":hover": {
                            boxShadow: '5px 5px 10px #aaa',
                        },
                    }}
                >
                    <img src={logo} width="70" height="70" alt="Logo" />
                    <Typography variant={"h4"} color={"primary"} align={"center"} >Registro:</Typography>
                    <TextField
                        margin='normal'
                        type={'text'}
                        variant='outlined'
                        placeholder='Name'
                        onChange={_onHandleChangeUser}
                    />
                    <TextField
                        margin='normal'
                        type={'text'}
                        variant='outlined'
                        placeholder='Password'
                        onChange={_onHandleChangePass}
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
                        onClick={onHandleRegister}
                    >
                        <Typography variant="p" color="white" align="center">
                            Registro
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider >
    )
}

export default RegisterFrom
