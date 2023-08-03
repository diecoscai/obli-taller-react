import './App.css';
import Login from '../Pages/Login';
// import Register from '../Pages/Register';

import { Routes, Route } from 'react-router-dom';

<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
