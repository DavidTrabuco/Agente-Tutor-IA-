import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, PrivateRoute } from './hooks/useLogin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/DashboardPages';
import Login from './pages/LoginPages';
import Signup from './pages/SignUpPages';
import Questionario from './pages/QuestionarioPages';
import Quiz from './pages/QuizPages';
import ChatPage from './pages/ChatbotPages';
import TelaPrincipalPage from './pages/TelaPrincipalPages';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col bg-[#181818]">
      {user && <Navbar />}
      <main className="flex-1 overflow-y-auto">
        <Routes>

          <Route path="/" element={!user ? <TelaPrincipalPage /> : !user.onboarded ? <Navigate to="/questionario" /> : <Navigate to="/dashboard" />} />

          {/* Aqui se ele clicar o sair ele vai para o Login */}
          <Route path="/login" element={!user ? <Login /> : !user.onboarded ? <Navigate to="/questionario" /> : <Navigate to="/dashboard" />} />


          {/* Aqui se ele clicar no cadastrar ,ele vai para o cadastro  */}
          <Route path="/signup" element={!user ? <Signup /> : !user.onboarded ? <Navigate to="/questionario" /> : <Navigate to="/dashboard" />} />

                    
          <Route path="/questionario" element={
            <PrivateRoute>
              {user?.onboarded ? <Navigate to="/dashboard" /> : <Questionario />}
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              {!user?.onboarded ? <Navigate to="/questionario" /> : <Dashboard />}
            </PrivateRoute>
          } />
          <Route path="/quiz" element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } />
          <Route path="/chatbot" element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
