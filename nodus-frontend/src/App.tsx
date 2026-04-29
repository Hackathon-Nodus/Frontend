import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Profile from './pages/profile/profile.tsx';
import { NetworkFeed } from './features/problems/NetworkFeed';
import { ProblemsDetailPage } from './features/problems/components/ProblemsDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing / Feed */}
        <Route path="/" element={<NetworkFeed />} />

        {/* Problem Detail Page */}
        <Route path="/problem/:id" element={<ProblemsDetailPage />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;