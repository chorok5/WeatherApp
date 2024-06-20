import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}
export default App;
