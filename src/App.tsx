import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import TutorialsList from './components/Tutorials/TutorialsList';
import AddTutorial from './components/Tutorials/AddTutorial';
import Tutorial from './components/Tutorials/Tutorial';
import DrawMandala from './components/Mandala/DrawMandala';
import Navbar from './components/Navbar';
import Login from './components/Logins/Login';
import { useEffect, useState } from 'react';
import { User } from './components/Logins/User';


function App() {

  const getInitialToken = () => {
    const savedToken = localStorage.getItem("token") as string;
    return savedToken;
  }

  const getInitialUsers = () => {
    const savedUsers: User[] = JSON.parse(localStorage.getItem("users") || '{}');
    return savedUsers;
  }

  const [users, setUsers] = useState<User[]>(getInitialUsers || []);
  const [token, setToken] = useState(getInitialToken || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleToken = (token: string) => {
    setToken(token);
  }

  const handleLoginMessage = (loginMessage: string) => {
    setMessage(loginMessage);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList />} />
            <Route path="/tutorials" element={<TutorialsList />} />
            <Route path="/add" element={<AddTutorial />} />
            <Route path="/mandala" element={<DrawMandala />} />
            <Route path="/login" element={
              <Login
                getToken={handleToken}
                getLoginMessage={handleLoginMessage}
              />
            } />
            <Route path="/tutorials/:id" element={<Tutorial />} />
          </Routes>
        </div>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
