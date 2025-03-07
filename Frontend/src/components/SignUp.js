import React, { useState } from 'react';
import supabase from '../supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Cadastro realizado com sucesso!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default SignUp;
