const db = require("../db/conection.js");

module.exports = {
    db, // Adiciona isso para expor o knex no controller

    getAll: () => db("produtos"),

    getById: (id) => db("produtos").where("idProd", id).first(),

    create: (produto) => db("produtos").insert(produto),

    update: (id, produto) => db("produtos").where("idProd", id).update(produto),

    remove: (id) => db("produtos").where("idProd", id).del()
};
