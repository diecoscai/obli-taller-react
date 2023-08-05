import './App.css';
import Login from '../Pages/Login/Login';
import RegisterForm from '../Pages/Register/RegisterForm';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ListadoPersonasCensadas from '../Pages/Dashboard/Main/ListadoPersonasCensadas';
import { Routes, Route } from 'react-router-dom';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/censados" element={<ListadoPersonasCensadas />} />
      </Routes>
    </div>
  );
}

export default App;
