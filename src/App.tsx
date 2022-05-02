import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import DrawMandala from './components/Mandala/DrawMandala';
import Navbar from './components/Navbar';
import Login from './components/Logins/Login';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import AdminTools from './components/Admin/AdminTools';
import MandalaService from './services/MandalaService';
import Mandalas from './components/Mandala/Mandalas';
import { PublicUser } from './types/PublicUser';

function App() {

  const [user, setUser] = useState(new User());
  const [token, setToken] = useState('');
  // const [message, setMessage] = useState('');
  const [headerMessage, setHeaderMessage] = useState('שלום אורח');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token") || '');
    retrieveUser(localStorage.getItem("token") || '');
  }, []);

  useEffect(() => {
    console.log('in useEffect[user]: user=', user);
  }, [user]);

  useEffect(() => {
    console.log('in useEffect[token]: token=', token);
    retrieveUser(token);
  }, [token]);

  const retrieveUser = (token: string) => {
    token &&
      MandalaService.getUser(token)
        .then((response: any) => {
          setUser(response.data);
          response.data.name ?
            setHeaderMessage('שלום ' + response.data.name)
            : setHeaderMessage('שלום אורח');
        })
        .catch((e: Error) =>
          console.log(e));
  }

  const handleToken = (token: string) => {
    localStorage.setItem("token", token);
    retrieveUser(token);
    setToken(token);
  }

  const handleLoginMessage = (loginMessage: string) => {
    // setMessage(loginMessage);
    setIsAdmin(loginMessage === 'Hello Admin' ?
      true : false);
  }

  const logout = () => {
    if (token) {
      MandalaService.logout(token);
      setToken('');
      setUser(new User);
      setHeaderMessage('שלום אורח');
      // retrieveUser();
      localStorage.setItem("token", '');
    }
  }

  // const handlePublicUser = (publicUser: PublicUser) => {

  // }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          headerMessage={headerMessage}
          isLogin={token ? true : false}
          logout={logout}
        />
        <div className="container mt-3">
          <Routes>
            {/* <Route path="/mandala" element={
              <Mandalas
                publicUser={user as PublicUser}
              />} /> */}
            {["/", "/mandala", token && "/login"].map((path, index) => {
              return (
                <Route path={path} element={
                  <Mandalas
                    publicUser={user as PublicUser}
                    // handlePublicUser={handlePublicUser}
                    token={token}
                  />}
                  key={index}
                />
              );
            })}
            {token}
            <Route
              path="/login" element={
                <Login
                  getToken={handleToken}
                  getLoginMessage={handleLoginMessage}
                />
              } />
            {isAdmin &&
              <Route path="/admin" element={
                <AdminTools
                  adminToken={token}
                  isAdmin={isAdmin}
                />} />}
          </Routes>
        </div>
        {/* <p>{message}</p> */}
      </header>
    </div>
  );
}

export default App;
