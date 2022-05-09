import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Logins/Login';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import UsersList from './components/Admin/UsersList';
import MandalaService from './services/MandalaService';
import Mandalas from './components/Mandala/Mandalas';
import { PublicUser } from './types/PublicUser';
import { useNavigate } from 'react-router';


function App() {

  const [user, setUser] = useState(new User());
  const [token, setToken] = useState('');
  // const [message, setMessage] = useState('');
  const [headerMessage, setHeaderMessage] = useState('שלום אורח');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   setToken(localStorage.getItem("token") || '');
  //   retrieveUser(localStorage.getItem("token") || '');
  // }, []);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    storedToken && storedToken !== 'undefined' &&
      setToken(storedToken) &&
      retrieveUser(storedToken);
    console.log()
  }, []);

  useEffect(() => {
    console.log('in useEffect[user]: user=', user);
  }, [user]);

  useEffect(() => {
    console.log('in useEffect[token]: token=', token);
    token && retrieveUser(token);
  }, [token]);

  const retrieveUser = (token: string) => {
    // console.log(token)
    token && token !== 'undefined' &&
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

  const handleIsAdmin = (isAdminLogged: boolean) => {
    setIsAdmin(isAdminLogged);
  }
  const logout = () => {
    if (token) {
      MandalaService.logout(token);
      setToken('');
      setUser(new User);
      setHeaderMessage('שלום אורח');
      // retrieveUser();
      localStorage.setItem("token", '');
      setIsAdmin(false);
      navigate('/login');
    }
  }

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
            {
              token ?
                ["/", "/mandala", "/login"].map((path, index) => {
                  return (
                    <Route path={path} element={
                      <Mandalas
                        publicUser={user as PublicUser}
                        token={token}
                      />}
                      key={index}
                    />
                  );
                })
                :
                ["/", "/login"].map((path, index) => {
                  return (
                    <Route path={path} element={
                      <Login
                        getToken={handleToken}
                        handleIsAdmin={handleIsAdmin}
                      />}
                      key={index}
                    />
                  );
                })
            }
            <Route path="/admin" element={
              <UsersList
                token={token}
                isAdmin={isAdmin}
              />} />
            <Route path="/mandala" element={
              <Mandalas
                publicUser={user as PublicUser}
                token={token}
              />} />
          </Routes>
        </div>
        {/* <p>{message}</p> */}
      </header>
    </div>
  );
}

export default App;
