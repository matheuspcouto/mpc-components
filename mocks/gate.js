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
                return res.status(200).json(dados['login']);
            }
            if (path === '/cadastrar') {
                return res.status(201).json(dados['cadastrar']);
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