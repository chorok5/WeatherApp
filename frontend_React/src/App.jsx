import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login'; // Import Login component
import SignUp from './pages/SignUp'; // Import SignUp component
import { useAuthContext } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
