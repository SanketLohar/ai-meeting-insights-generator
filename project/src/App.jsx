import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Generate from './pages/Generate';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout className="app-layout">
          <Navbar />
          <Layout className="app-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={
                <ProtectedRoute>
                  <Generate />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
          <Footer />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;