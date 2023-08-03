import { useState } from 'react';
import { validUser } from '../api/api';
import './Login.css';

const Login = ({ setUserLogged }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleChangeUser = (event) => {
    event.preventDefault();
    setUser(event.target.value);
  };

  const handleChangePass = (event) => {
    event.preventDefault();
    setPass(event.target.value);
  };

  const onClickRegister = () => {
    console.log('Hacer Register');
  };

  //   const [userLogged, setUserLogged] = useState(() => {
  //     const storedUser = localStorage.getItem('userLogged');
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   });

  //   useEffect(() => {
  //     localStorage.setItem('userLogged', JSON.stringify(userLogged));
  //   }, [userLogged]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user !== '' || pass !== '') {
      validUser(user, pass)
        .then((data) => {
          console.log('data1: ', data);
          setUserLogged(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Ingrese los datos en los inputs');
    }
  };

  //   console.log('user: ', userLogged);
  return (
    <div className="login-form">
      <form>
        <label htmlFor="txtUser">Usuario: </label>
        <input type="text" id="txtUser" value={user} onChange={handleChangeUser} required />
        <label htmlFor="txtPass">Contraseña: </label>
        <input type="password" id="txtPass" value={pass} onChange={handleChangePass} required />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClickRegister}>Registrarse</button>
      </form>
    </div>
  );
};

export default Login;
