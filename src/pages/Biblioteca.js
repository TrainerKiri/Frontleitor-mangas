import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

function Biblioteca() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      const { data, error } = await supabase
        .from('content')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Biblioteca Digital
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore nossa coleção de mangás e HQs
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.map((item) => (
            <Link
              key={item.id}
              to={`/leitor/${item.id}`}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden card-hover"
            >
              {item.cover_image_url && (
                <div className="w-full h-64 bg-gray-200 relative">
                  <img
                    src={item.cover_image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>
                {item.categories?.name && (
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mt-2">
                    {item.categories.name}
                  </span>
                )}
                <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {content.length === 0 && (
          <div className="text-center mt-12">
            <h3 className="text-lg font-medium text-gray-900">
              Nenhum conteúdo disponível no momento
            </h3>
            <p className="mt-1 text-gray-500">
              Novos títulos serão adicionados em breve!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Biblioteca;