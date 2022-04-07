import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import TutorialsList from './components/Tutorials/TutorialsList';
import AddTutorial from './components/Tutorials/AddTutorial';
import Tutorial from './components/Tutorials/Tutorial';
import DrawMandala from './components/Mandala/DrawMandala';
import Navbar from './components/Navbar';
import Register from './components/Logins/Register';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList />} />
            <Route path="/tutorials" element={<TutorialsList />} />
            <Route path="/add" element={<AddTutorial />} />
            <Route path="/mandala" element={<DrawMandala />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tutorials/:id" element={<Tutorial />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
