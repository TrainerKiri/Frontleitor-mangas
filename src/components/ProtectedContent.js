import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const ProtectedContent = () => {
  const [user, setUser] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        alert('Erro ao buscar usuário');
      } else {
        setUser(data);
        checkPaymentStatus(data.id);
      }
    };

    fetchUserData();
  }, []);

  const checkPaymentStatus = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('is_paid')
      .eq('id', userId)
      .single();

    if (error) {
      alert('Erro ao verificar status de pagamento');
    } else {
      setIsPaid(data.is_paid);
    }
  };

  if (!user) {
    return <p>Você precisa fazer login para acessar esta página.</p>;
  }

  if (!isPaid) {
    return <p>Você precisa de uma conta paga para acessar este conteúdo.</p>;
  }

  return (
    <div>
      <h1>Conteúdo Protegido</h1>
      <p>Este é o conteúdo pago que só usuários com pagamento confirmado podem acessar.</p>
    </div>
  );
};

export default ProtectedContent;
