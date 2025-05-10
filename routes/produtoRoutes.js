const produtoController = require("../controllers/produtoController");

function produtoRoutes(server) {
    server.get("/produto", produtoController.getAll);
    server.get("/produto/:idProd", produtoController.getById);
    server.post("/produto", produtoController.create);
    server.put("/produto/:idProd", produtoController.update);
    server.del("/produto/:idProd", produtoController.remove);
}

module.exports = produtoRoutes;
