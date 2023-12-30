
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
      </>
    </Router>
  );
}

export default App;
