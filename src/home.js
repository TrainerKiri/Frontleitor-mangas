import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const mangas = [
    { id: 1, titulo: "One Piece", descricao: "A grande aventura dos mares!", capa: "/img/onepiece.jpg" },
    { id: 2, titulo: "Naruto", descricao: "O caminho de um ninja!", capa: "/img/naruto.jpg" },
    { id: 3, titulo: "Berserk", descricao: "Uma jornada sombria de vingança.", capa: "/img/berserk.jpg" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Cabeçalho */}
      <header className="p-4 flex justify-between items-center bg-gray-800">
        <h1 className="text-2xl font-bold">Leitor de Mangás</h1>
        <nav>
          <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
          <Link to="/biblioteca" className="hover:text-gray-300">Minha Biblioteca</Link>
        </nav>
      </header>

      {/* Grid de Mangás */}
      <main className="p-6">
        <h2 className="text-xl mb-4">Mangás Disponíveis</h2>
        <div className="grid grid-cols-3 gap-4">
          {mangas.map((manga) => (
            <div key={manga.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <img src={manga.capa} alt={manga.titulo} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-bold mt-2">{manga.titulo}</h3>
              <p className="text-sm text-gray-400">{manga.descricao}</p>
              <Link to={`/leitor/${manga.id}`} className="block mt-2 bg-blue-500 hover:bg-blue-600 text-center py-2 rounded-md">
                Ler Agora
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="p-4 text-center bg-gray-800 mt-6">
        <p>&copy; 2025 Leitor de Mangás. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
