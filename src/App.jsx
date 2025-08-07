import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './component/home';
import Answer from './component/answer';
import Login from './component/login';

function App() {
  const navigate = useNavigate();
  
  return (
    <Router>
      {/* Header Section */}
      <header className="header">
        <div className="logo-container" onClick={() => navigate('/home')}>
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="title">Smart Study Buddy</h1>
        </div>

        <div className="user-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              fill="currentColor"
            />
          </svg>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
    </Router>
  );
}

export default App;
