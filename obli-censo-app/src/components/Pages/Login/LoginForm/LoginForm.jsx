import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onLogin } from '../../../../app/slices/userSlices';
import { fetchLogin } from '../../../../api/censoAPI';
import { Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomAlert from '../../../UI/CustomAlert';

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      yellowButton: createColor('#2c3d5e')
    }
  });

  const _onLogin = ({ apiKey, id }) => {
    dispatch(onLogin({ apiKey, id }));

    navigate('/dashboard', { replace: true });
  };

  const _onHandleLogin = (e) => {
    e.preventDefault();
    if (!_isEmptyForm()) {
      fetchLogin(user, password)
        .then((userData) => {
          setShowSuccessAlert(true);

          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 3000);
          setTimeout(() => {
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
    return user === '' || password === '';
  };

  const _onHandleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const _onHandleChangePass = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {showSuccessAlert && <CustomAlert message="Login successfully!" color="success" />}{' '}
      <ThemeProvider theme={theme}>
        <Typography variant={'h4'} color={'#2c3d5e'} align={'center'}>
          Login
        </Typography>
        <TextField
          margin="normal"
          type={'text'}
          variant="outlined"
          placeholder="Name"
          id="txtUser"
          onChange={_onHandleChangeUser}
        />
        <TextField
          margin="normal"
          type={'password'}
          variant="outlined"
          placeholder="Password"
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
            textShadow: '2px 2px 5px #555549'
          }}
          onClick={_onHandleLogin}>
          <Typography variant={'p'} color={'white'} align={'center'}>
            Login!
          </Typography>
        </Button>
      </ThemeProvider>
    </>
  );
};

export default LoginForm;
