import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLogin } from '../../../../app/slices/userSlices';
import { fetchLogin } from '../../../../api/censoAPI';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import logo from '../../../../logo.png';

const LoginForm = () => {
    // const [message, setMessage] = useState('');
    // const [classColor, setClassColor] = useState('');
    // const [showAlert, setShowAlert] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const inputUserName = useRef();
    const inputPassword = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
    const theme = createTheme({
        palette: {
            yellowButton: createColor('#FFD25E'),
        },
    });


    const _onLogin = ({ apiKey, id }) => {
        dispatch(onLogin({ apiKey, id }));
        navigate('/dashboard/');
    };

    const _onHandleLogin = (e) => {
        e.preventDefault();
        if (!_isEmptyForm()) {
            fetchLogin(inputUserName.current.value, inputPassword.current.value)
                .then((userData) => {
                    console.log('Login exitoso');
                    setTimeout(() => {
                        // Funcion de App
                        _onLogin(userData);
                    }, 2000);
                })
                .catch((e) => {
                    console.log('Danger');
                });
        } else {
            alert('Error');
        }
    };

    const _isEmptyForm = () => {
        return (
            inputUserName.current.value.length === 0 ||
            inputPassword.current.value.length === 0
        );
    };

    const _onHandleChange = () => {
        if (!_isEmptyForm) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography variant={"h4"} color={"primary"} align={"center"} >Sign Up:</Typography>
                <TextField
                    margin='normal'
                    type={'text'}
                    variant='outlined'
                    placeholder='Name'
                    id="txtUser"
                    ref={inputUserName}
                    onChange={_onHandleChange} />
                <TextField
                    margin='normal'
                    type={'text'}
                    variant='outlined'
                    placeholder='Password'
                    ref={inputPassword}
                    onChange={_onHandleChange} />
                <Button
                    variant="contained"
                    color="yellowButton"
                    sx={{
                        marginTop: 5,
                        borderRadius: 2,
                        boxShadow: '2px 2px 5px #ccc',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 5px #555549',

                    }}>
                    <Typography variant={"p"} color={"white"} align={"center"}>Sign Up!</Typography>
                </Button>
            </ThemeProvider >
        </>
    );
};

export default LoginForm;
