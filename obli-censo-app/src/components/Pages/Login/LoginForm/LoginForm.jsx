import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLogin } from '../../../../app/slices/userSlices';
import { fetchLogin } from '../../../../api/censoAPI';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import logo from '../../../../logo.png';

const LoginForm = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
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
            fetchLogin(user, password)
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
        return (user === '' || password === '');
    };

    const _onHandleChangeUser = (e) => {
        setUser(e.target.value);
        console.log(user);
    }

    const _onHandleChangePass = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }
    /*
        const _onHandleChange = (e) => {
            if (!_isEmptyForm) {
                setBtnDisabled(false);
            } else {
                setBtnDisabled(true);
            }
        };
    */
    return (
        <>
            <ThemeProvider theme={theme}>
                <Typography variant={"h4"} color={"primary"} align={"center"} >Login</Typography>
                <TextField
                    margin='normal'
                    type={'text'}
                    variant='outlined'
                    placeholder='Name'
                    id="txtUser"
                    onChange={_onHandleChangeUser} />
                <TextField
                    margin='normal'
                    type={'text'}
                    variant='outlined'
                    placeholder='Password'
                    onChange={_onHandleChangePass} />
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
                    onClick={_onHandleLogin}
                >
                    <Typography variant={"p"} color={"white"} align={"center"}>Login!</Typography>
                </Button>
            </ThemeProvider >
        </>
    );
};

export default LoginForm;
