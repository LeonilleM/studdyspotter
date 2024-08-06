import Navbar from './components/common/sidenavbar';
import UserProfile from './components/common/usernavbar';
import HomePage from './pages/home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/signin' && location.pathname !== '/signup';

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<UserProfile />} />
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
