import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile/profile.tsx';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;