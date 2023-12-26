
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
