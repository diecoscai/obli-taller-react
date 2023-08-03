import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import LoginForm from './LoginForm';
import logo from '../../../logo.png';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material'
import { createTheme, ThemeProvider, } from '@mui/material/styles';

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userLogged);
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <>
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
                <LoginForm />
                <br />
                <Link to={'/register'}>No tienes cuenta?</Link>
            </Box >
        </>
    );
};

export default Login;
