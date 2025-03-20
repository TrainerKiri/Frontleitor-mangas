import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Leitor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(null);

  async function fetchContent() {
    try {
      // Buscar informações do conteúdo
      const { data: contentData, error: contentError } = await supabase
        .from('content')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('id', id)
        .single();

      if (contentError) throw contentError;
      setContent(contentData);

      // Buscar capítulos
      const { data: chaptersData, error: chaptersError } = await supabase
        .from('chapters')
        .select('*')
        .eq('content_id', id)
        .order('chapter_number', { ascending: true });

      if (chaptersError) throw chaptersError;
      setChapters(chaptersData || []);
      
      if (chaptersData?.length > 0) {
        setCurrentChapter(chaptersData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error.message);
      toast.error('Erro ao carregar conteúdo');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      toast.error('Faça login para acessar o conteúdo');
      navigate('/login');
      return;
    }
    fetchContent();
  }, [id, user, navigate, fetchContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Conteúdo não encontrado</h2>
          <button
            onClick={() => navigate('/biblioteca')}
            className="mt-4 button-primary"
          >
            Voltar para Biblioteca
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
              <button
                onClick={() => navigate('/biblioteca')}
                className="button-secondary"
              >
                Voltar
              </button>
            </div>
            {content.categories?.name && (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mt-2">
                {content.categories.name}
              </span>
            )}
            <p className="mt-4 text-gray-600">{content.description}</p>
          </div>

          {/* Lista de Capítulos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="md:col-span-1 space-y-4">
              <h3 className="font-semibold text-lg text-gray-900">Capítulos</h3>
              <div className="space-y-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapter(chapter)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      currentChapter?.id === chapter.id
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Capítulo {chapter.chapter_number}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizador de Conteúdo */}
            <div className="md:col-span-3">
              {currentChapter ? (
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-xl mb-4">
                    Capítulo {currentChapter.chapter_number} - {currentChapter.title}
                  </h3>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <img
                      src={currentChapter.content_url}
                      alt={`Capítulo ${currentChapter.chapter_number}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <p className="text-gray-500">Selecione um capítulo para começar a ler</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leitor;