const errors = require("restify-errors");
const Produto = require("../models/produtoModel.js");

module.exports = {
   getAll: async (req, res) => {
    try {
        // Testa conexão com o banco (executando uma query simples)
        const test = await Produto.db.raw("SELECT 1+1 AS resultado");
        console.log("Conexão bem-sucedida com o banco! Resultado:", test[0]);

        // Busca produtos normalmente
        const dados = await Produto.getAll();
        res.send(dados);
    } catch (err) {
        console.error("Erro ao conectar ou buscar produtos:", err);
        res.send(new errors.InternalServerError("Erro ao buscar produtos"));
    }
},

    getById: async (req, res) => {
    try {
        // 1. Verifique se o ID está sendo recebido
        const id = req.params.idProd;
        if (!id) {
            return res.status(400).send(new errors.BadRequestError("ID do produto não fornecido"));
        }

        // 2. Adicione logs para depuração
        console.log(`Buscando produto com ID: ${id}`);
        
        const produto = await Produto.getById(id);
        
        // 3. Verifique o que está retornando
        console.log('Resultado da busca:', produto);
        
        if (!produto) {
            return res.status(404).send(new errors.NotFoundError("Produto não encontrado"));
        }
        
        return res.send(produto);
    } catch (err) {
        // 4. Log do erro completo para diagnóstico
        console.error('Erro ao buscar produto:', err);
        return res.status(500).send(new errors.InternalServerError("Erro ao buscar o produto"));
    }
},

    create: async (req, res) => {
        try {
            const result = await Produto.create(req.body);
            if (!result) {
                res.send(new errors.BadRequestError("Não foi possível inserir"));
            } else {
                res.send(201, { success: true, id: result[0] });
            }
        } catch (err) {
            res.send(new errors.InternalServerError("Erro ao criar produto"));
        }
    },

    update: async (req, res) => {
        try {
            const result = await Produto.update(req.params.idProd, req.body);
            if (!result) {
                res.send(new errors.NotFoundError("Produto não encontrado"));
            } else {
                res.send({ success: true });
            }
        } catch (err) {
            res.send(new errors.InternalServerError("Erro ao atualizar produto"));
        }
    },

    remove: async (req, res) => {
        try {
            const result = await Produto.remove(req.params.idProd);
            if (!result) {
                res.send(new errors.NotFoundError("Produto não encontrado"));
            } else {
                res.send({ success: true });
            }
        } catch (err) {
            res.send(new errors.InternalServerError("Erro ao remover produto"));
        }
    }
};
