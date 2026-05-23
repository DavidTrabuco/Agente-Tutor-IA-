import type { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import ChatPage from './pages/Chat';
import Quiz from './components/Quiz';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-[#181818] flex items-center justify-center text-white">Carregando...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div style={{ backgroundColor: '#181818', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {user && <Navbar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/onboarding" /> : <Signup />} />
          <Route path="/onboarding" element={
            <PrivateRoute>
              {user?.onboarded ? <Navigate to="/" /> : <Onboarding />}
            </PrivateRoute>
          } />
          <Route path="/" element={
            <PrivateRoute>
              {!user?.onboarded ? <Navigate to="/onboarding" /> : <Dashboard />}
            </PrivateRoute>
          } />
          <Route path="/tutor" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } />
          <Route path="/quiz" element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } />
        </Routes>
      </div>
      {user && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
