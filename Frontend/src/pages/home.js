import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Leitor de Mangás</h1>
      <Link to="/login">Entrar</Link>
    </div>
  );
}

export default Home;
