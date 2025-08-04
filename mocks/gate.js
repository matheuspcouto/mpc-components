const dados = require('./dados.json');

module.exports = (req, res, next) => {
    const { path, method } = req;

    // Verifica se a resposta já foi enviada
    if (res.headersSent) {
        return next();
    }

    try {
        // GET
        if (method === 'GET') {
            if (path === '/listar') {
                return res.status(200).json(dados['listar']);
            }
            if (path === '/detalhes') {
                return res.status(200).json(dados['detalhes']);
            }
        }

        // POST
        if (method === 'POST') {
            if (path === '/inscrever') {
                return res.status(200).json(dados['inscrever']);
            }
            if (path === '/login') {
                const email = req.headers.email;
                const senha = req.headers.senha;
                
                // Simulação de autenticação
                if (email === 'admin@teste.com' && senha === '123456') {
                    return res.status(200).json(dados['login']['admin@teste.com']);
                } else if (email === 'usuario@teste.com' && senha === '123456') {
                    return res.status(200).json(dados['login']['usuario@teste.com']);
                } else {
                    return res.status(401).json({ error: 'Credenciais inválidas' });
                }
            }
        }

        // Se não encontrou nenhuma rota, continua para o próximo middleware
        return next();
    } catch (error) {
        console.error('Erro no middleware gate.js:', error);

        // Se ainda não enviou resposta, envia erro
        if (!res.headersSent) {
            return res.status(500).json({
                error: 'Erro interno do servidor',
                message: error.message
            });
        }

        return next(error);
    }
}