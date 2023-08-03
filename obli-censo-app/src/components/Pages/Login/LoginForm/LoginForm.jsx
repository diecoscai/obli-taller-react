import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLogin } from '../../../../app/slices/userSlices';
import { fetchLogin } from '../../../../api/censoAPI';
import { Button } from '@mui/material';

const LoginForm = () => {
    // const [message, setMessage] = useState('');
    // const [classColor, setClassColor] = useState('');
    // const [showAlert, setShowAlert] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const inputUserName = useRef();
    const inputPassword = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className="login-form">
            <form>
                <label htmlFor="txtUser">Usuario: </label>
                <input
                    className="form-control"
                    type="text"
                    id="txtUser"
                    ref={inputUserName}
                    onChange={_onHandleChange}
                />
                <label htmlFor="txtPass">Contraseña: </label>
                <input
                    className="form-control"
                    type="password"
                    ref={inputPassword}
                    onChange={_onHandleChange}
                />
                <Button variant="contained">Login</Button>
            </form>
        </div>
    );
};

export default LoginForm;
