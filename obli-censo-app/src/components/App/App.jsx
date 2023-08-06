import './App.css';
import Login from '../Pages/Login/Login';
import RegisterForm from '../Pages/Register/RegisterForm';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ListadoPersonasCensadas from '../Pages/Dashboard/Main/ListadoPersonasCensadas';
import PrivateRoute from '../Pages/PrivateRoute.jsx';
import Layout from '../Pages/Layout/Layout';
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
        <Route
          path='/dashboard'
          element={
            <PrivateRoute redirectTo='/login'>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path='' element={<Dashboard />} />
          <Route path='add-censado' element={<Dashboard />} />
          <Route path='list-censados' element={<ListadoPersonasCensadas />} />
        </Route>
        <Route path='*' element={<Dashboard />} />
      </Routes>
    </div >
  );
}

export default App;
