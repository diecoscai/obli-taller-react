import { useState } from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  const [user, setUserLogged] = useState({});

  return (
    <div className="App">
      {user.id ? <h1>ESTAS LOGEADO LUMPE</h1> : <Login setUserLogged={setUserLogged} />}
    </div>
  );
}

export default App;
