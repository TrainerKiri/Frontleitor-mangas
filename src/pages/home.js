import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 relative">
            <span className="gradient-text">Biblioteca 2∞</span>
          </h1>
          <p className="text-lg leading-8 text-gray-300 mb-8">
            Sua biblioteca digital de conteúdo geek. Mergulhe em um universo infinito de mangás, HQs e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link to="/biblioteca" className="button-primary w-full sm:w-auto">
                Acessar Biblioteca
              </Link>
            ) : (
              <>
                <Link to="/login" className="button-primary w-full sm:w-auto">
                  Começar Agora
                </Link>
                <Link to="/sobre" className="button-secondary w-full sm:w-auto">
                  Saiba mais
                </Link>
              </>
            )}
          </div>

          {/* Cards de destaque */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 card-hover">
              <div className="h-12 w-12 bg-primary-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Biblioteca Completa</h3>
              <p className="text-gray-300">Acesso a milhares de títulos em um só lugar.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 card-hover">
              <div className="h-12 w-12 bg-secondary-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Acesso Ilimitado</h3>
              <p className="text-gray-300">Leia quando e onde quiser, sem limitações.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 card-hover sm:col-span-2 lg:col-span-1">
              <div className="h-12 w-12 bg-primary-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Atualizações Constantes</h3>
              <p className="text-gray-300">Novos títulos adicionados semanalmente.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;