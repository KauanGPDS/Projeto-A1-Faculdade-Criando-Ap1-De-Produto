const restify = require("restify");
const produtoRoutes = require("./routes/produtoRoutes");

const server = restify.createServer({
    name: "Lojinha",
    version: "1.0.0"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8001, () => {
    console.log("%s executando em: %s", server.name, server.url);
});

server.get("/", (req, res, next) => {
    res.send({ resposta: "Sejam bem-vindos à nossa Lojinha" });
    next();
});

produtoRoutes(server);
