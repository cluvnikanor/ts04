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
import AdminTools from './components/Admin/AdminTools';
import MandalaService from './services/MandalaService';


function App() {

  const getInitialToken = () => {
    const savedToken = localStorage.getItem("token") as string;
    return savedToken;
  }

  const getInitialUsers = () => {
    const savedUsers: User[] = JSON.parse(localStorage.getItem("users") || '{}');
    return savedUsers;
  }

  const retrieveUsers = () => {
    MandalaService.getUsers()
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((e: Error) =>
        console.log(e));
  }

  // const [users, setUsers] = useState<User[]>(getInitialUsers || []);
  const [users, setUsers] = useState<Array<User>>([]);
  const [token, setToken] = useState(getInitialToken || '');
  const [message, setMessage] = useState('');
  // const [isAdmin, setIsAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    retrieveUsers();
  }, [users]);

  // useEffect(() => {
  //   localStorage.setItem("users", JSON.stringify(users));
  // }, [users]);

  const handleUsers = (usersList: User[]) => {
    setUsers(usersList);
  }

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
            <Route path="/" element={<DrawMandala />} />
            {/* <Route path="/tutorials" element={<TutorialsList />} /> */}
            <Route path="/add" element={<AddTutorial />} />
            <Route path="/mandala" element={<DrawMandala />} />
            <Route path="/login" element={
              <Login
                getToken={handleToken}
                getLoginMessage={handleLoginMessage}
              />} />
            {isAdmin &&
              <Route path="/admin" element={
                <AdminTools
                  adminToken={token}
                  users={users}
                  getUsersList={handleUsers}
                />} />}
            {/* <Route path="/tutorials/:id" element={<Tutorial />} /> */}
          </Routes>
        </div>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
