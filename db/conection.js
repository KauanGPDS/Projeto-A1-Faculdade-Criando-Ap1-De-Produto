const knex = require("knex");

const conn = knex({
    client: "mysql2",  // Mude de "mysql" para "mysql2"
    connection: {
        host: "localhost",
        user: "root",  // Ou outro usuário que você criou
        password: "Sucode@1",  // Sua senha do MySQL (deixe vazio se não tiver)
        database: "sistema_produtos",
        port: 3306
    },
    pool: {
        min: 2,
        max: 10
    }
});

module.exports = conn;