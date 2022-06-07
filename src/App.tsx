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
import StartPage from './components/StartPage';
import AdminPage from './components/Admin/AdminPage';
import { appContext, IAppContext } from './AppContext';

function App() {

  const [user, setUser] = useState(new User());
  const [token, setToken] = useState('');
  const [navbarMessage, setNavbarMessage] = useState('אורחת');
  // const [startPageData, setStartPageData] = useState(new StartPageData('ברוכה הבאה לעולם המנדלות'));
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const context1Provider: IAppContext = {
    isAdmin: isAdmin,
    token: token,
  }

  useEffect(() => {
    localStorage.getItem("isAdmin") === 'true' && setIsAdmin(true);
    const storedToken = localStorage.getItem("token");
    storedToken && storedToken !== 'undefined' &&
      setToken(storedToken) &&
      retrieveUser(storedToken);
  }, []);

  useEffect(() => {
    console.log('in useEffect[user]: user=', user);
  }, [user]);

  useEffect(() => {
    console.log('in useEffect[token]: token=', token);
    token === 'undefined' && setToken('');
    token && retrieveUser(token);
  }, [token]);

  const retrieveUser = (token: string) => {
    token && token !== 'undefined' &&
      MandalaService.getUser(token)
        .then((response: any) => {
          setUser(response.data);
          response.data.name ?
            setNavbarMessage(response.data.name)
            : setNavbarMessage('אורחת');
        })
        .catch((e: Error) =>
          console.log(e));
  }

  const handleToken = (token: string) => {
    localStorage.setItem("token", token);
    retrieveUser(token);
    setToken(token);
  }

  // const handleStartPage = (startPageData: StartPageData) => {
  //   console.log(startPageData.h1)
  //   setStartPageData(startPageData);
  // }

  const handleIsAdmin = (isAdminLogged: boolean) => {
    setIsAdmin(isAdminLogged);
  }
  const logout = () => {
    if (token) {
      MandalaService.logout(token);
      setToken('');
      setUser(new User());
      setNavbarMessage('אורחת');
      localStorage.setItem("token", '');
      setIsAdmin(false);
      localStorage.setItem("isAdmin", `${false}`);
      navigate('/login');
    }
  }

  return (
    <div className="App">
      <appContext.Provider value={context1Provider}>
        <header className="App-header">
          <Navbar
            navbarMessage={navbarMessage}
            isLogin={token ? true : false}
            logout={logout}
          />
          <div className="container mt-3">
            <Routes>
              {["*", "/"].map((path, index) => {
                return (
                  <Route path={path} element={
                    <StartPage
                    // h1={startPageData.h1}
                    />}
                    key={index}
                  />
                );
              })}
              {
                token ?
                  ["/login"].map((path, index) => {
                    return (
                      <Route path={path} element={
                        <StartPage />}
                        key={index}
                      />
                    );
                  })
                  :
                  ["/login"].map((path, index) => {
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
              <Route path="/user" element={
                isAdmin &&
                <AdminPage />} />
              <Route path="/users" element={
                <UsersList />} />
              <Route path="/mandala" element={
                <Mandalas
                  publicUser={user as PublicUser} />} />
              <Route path="/mandala" element={
                <Mandalas
                  publicUser={user as PublicUser} />} />
            </Routes>
          </div>
        </header>
      </appContext.Provider>
    </div>
  );
}

export default App;
