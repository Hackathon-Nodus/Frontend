import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components/layout/Header'
import Profile from './features/profiles/profile.tsx';
import { NetworkFeed } from './features/problems/NetworkFeed';
import { ProblemsDetailPage } from './features/problems/components/ProblemsDetailPage';

function App() {
  return (
     <ThemeProvider>
    <Router>
        <Header />
      <Routes>
        {/* Landing / Feed */}
        <Route path="/" element={<NetworkFeed />} />

        {/* Problem Detail Page */}
        <Route path="/problem/:id" element={<ProblemsDetailPage />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;