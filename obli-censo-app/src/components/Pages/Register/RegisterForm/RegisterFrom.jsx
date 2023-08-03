import { fetchRegister } from '../../../api/censoAPI'
import { useDispatch } from 'react-redux'
import { useState, useRef } from 'react';
import Button from '../../UI/Button/Button'

const RegisterFrom = () => {
    //Variables and States
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const inputUserName = useRef();
    const inputPassword = useRef();

    //Handler Change to store de data
    const onHandleChange = () => {

    }
    //Handler Register
    const onHandleRegister = (e) => {
        e.preventDefault();
        fetchRegister(inputUserName.current.value, inputPassword.current.value)
            .then(response => {
                if (response.status === 200) {
                    setMessage('Usuario registrado');
                    //Hacer dispatch()
                }
            })
            .catch(error => {
                setMessage('Error al registrar usuario');
            });
    }

    return (
        <>
            <form>
                <label>Name</label> <br />
                <input
                    type="text"
                    name='name'
                    ref={inputUserName}
                    onChange={onHandleChange}
                />
                <label>Contraseña</label> <br />
                <input
                    type="password"
                    name='pass'
                    ref={inputPassword}
                    onChange={onHandleChange}
                />
                <label>Fecha de nacimiento</label> <br />
                <input type="date" name='date' />
                <label>Departamento</label> <br />
                <select>
                    <option>Departamento 1</option>
                </select>
                <label>City</label>
                <select>
                    <option>Ciudad 1</option>
                </select>
                <label>Ocupacion</label>
                <select>
                    <option>Ocupacion 1</option>
                </select>
                <Button
                    cta={'Sign Up'}
                    onHandleRegister={onHandleRegister}
                >Registrarse</Button>
            </form>
        </>
    )
}

export default RegisterFrom
