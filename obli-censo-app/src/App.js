import  RegisterForm  from './components/RegisterForm';
import { useState } from 'react';
import './App.css';
//import Login from './components/Login';

function App() {
  const [user, setUserLogged] = useState({});

  return (
    <div className="App">
      <RegisterForm></RegisterForm>
    </div>
  );
}

export default App;
