import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import LoginForm from './LoginForm';
import logo from '../../../logo.png';

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
            <section className="d-flex flex-md justify-content-center login">
                <div className="card">
                    <img src={logo} width="70" height="70" alt="Logo" />
                    <h3>Censo</h3>
                    <section className="card-body">
                        <LoginForm />
                        <br />
                        <Link to={'/signup'}>No tienes cuenta?</Link>
                    </section>
                </div>
            </section>
        </>
    );
};

export default Login;
