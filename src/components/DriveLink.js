import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const DriveLink = () => {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const user = supabase.auth.user();

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('is_paid')
          .eq('id', user.id)
          .single();

        if (error) {
          alert('Erro ao verificar status de pagamento');
        } else {
          setIsPaid(data.is_paid);
        }
      }
    };

    checkPaymentStatus();
  }, []);

  const getDriveLink = () => {
    if (isPaid) {
      return 'https://drive.google.com/your_protected_link';
    } else {
      return 'https://your_site.com/payment-page';
    }
  };

  return (
    <div>
      <h1>Acesse seu conteúdo</h1>
      <a href={getDriveLink()} target="_blank" rel="noopener noreferrer">
        Clique aqui para acessar seu conteúdo pago
      </a>
    </div>
  );
};

export default DriveLink;
