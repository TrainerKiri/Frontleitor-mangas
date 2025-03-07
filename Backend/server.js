// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Importar o Express, Stripe e Supabase
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(process.env.SUPABASE_URL); // Verifique se a URL do Supabase está sendo carregada corretamente
console.log(process.env.SUPABASE_ANON_KEY); // Verifique se a chave está sendo carregada corretamente

const { createClient } = require('@supabase/supabase-js');


// Inicializar o app do Express
const app = express();

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware para parsing do corpo da requisição
app.use(express.json());

// Rota para criar um pagamento
app.post('/create-payment-intent', async (req, res) => {
    try {
        // Verificar se o usuário está autenticado usando o token JWT
        const { access_token } = req.body; // O frontend passará o token de acesso JWT
        const { data: user, error } = await supabase.auth.api.getUser(access_token);

        if (error || !user) {
            return res.status(401).send({ error: 'Usuário não autenticado' });
        }

        // Aqui você pode buscar no banco de dados do Supabase se o usuário é pagante
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

        // Se o usuário não for pagante, retornar erro
        if (!subscription || !subscription.is_active) {
            return res.status(403).send({ error: 'Acesso restrito. Assine o serviço.' });
        }

        // Criar o pagamento com o valor que você deseja (em centavos)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // 10.00 USD (em centavos)
            currency: 'usd',
        });

        // Enviar a resposta com o client secret
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        // Lidar com erro
        console.error('Erro ao criar o PaymentIntent:', error);
        res.status(500).send({ error: error.message });
    }
});

// Configurar a porta para o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
