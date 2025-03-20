import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Home from "./pages/home";
import Login from "./pages/Login";
import Biblioteca from "./pages/Biblioteca";
import Leitor from "./pages/Leitor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/leitor/:id" element={<Leitor />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;