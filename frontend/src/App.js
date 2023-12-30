import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import ProtectedRoute from './Components/ProtectedRoute';  // Import ProtectedRoute directly
import Jobs from './Pages/Jobs';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/jobs"
          element={<ProtectedRoute element={<Jobs />} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />} />

      </Routes>

    </Router>
  );
}

export default App;
