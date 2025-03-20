import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Biblioteca from "./pages/Biblioteca";
import Leitor from "./pages/Leitor";
import Navbar from "./components/Navbar";

function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/leitor/:id" element={<Leitor />} />
      </Routes>
    </Router>
  );
}


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/leitor/:id" element={<Leitor />} />
      </Routes>
    </Router>
  );
}

export default App;
