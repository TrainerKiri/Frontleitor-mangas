import { Link } from "react-router-dom";

function Biblioteca() {
  // Simulação de mangás para exibir
  const mangas = [
    { id: "1", titulo: "One Piece" },
    { id: "2", titulo: "Naruto" },
  ];

  return (
    <div>
      <h1>Biblioteca</h1>
      <ul>
        {mangas.map((manga) => (
          <li key={manga.id}>
            <Link to={`/leitor/${manga.id}`}>{manga.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Biblioteca;
