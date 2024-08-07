import Navbar from './components/common/navigation/sidenavbar';
import UserProfile from './components/common/navigation/usernavbar';
import HomePage from './pages/home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/' && location.pathname !== '/signup';

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}
      {shouldShowNavbar && <UserProfile />}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  )
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
