# 🏷️ API de Produtos - Projeto Faculdade

API RESTful para gerenciamento de produtos desenvolvida com Node.js, Restify e MySQL, seguindo o padrão MVC.

## 🛠️ Tecnologias
- Node.js
- Restify
- MySQL
- Knex.js (Query Builder)
- Padrão MVC

## ⚙️ Instalação


# Clone o repositório
```
git clone https://github.com/KauanGPDS/Projeto-A1-Faculdade-Criando-Ap1-De-Produto.git
```
# Instale as dependências
```
npm install
```

# Configure o banco de dados em:
# db/connection.js
```
const knex = require("knex");

const conn = knex({
    client: "mysql2",  
    connection: {
        host: "localhost",
        user: "root",  
        password: "Sucode@1",  
        database: "sistema_produtos",
        port: 3306
    },
    pool: {
        min: 2,
        max: 10
    }
});


module.exports = conn;
```
## 📌 Ficha-Resumo: Padrão MVC

### 🔍 Definição
MVC (Model-View-Controller) é um padrão arquitetural que separa a aplicação em três componentes principais:
- **Model**: Gerencia dados e regras de negócio
- **View**: Responsável pela apresentação (JSON em APIs REST)
- **Controller**: Intermediário que processa requisições

### ✅ Vantagens
- Separação clara de responsabilidades
- Facilidade de manutenção
- Código mais organizado
- Melhor testabilidade
# Inicie o servidor
```
npm start
```

# 📂 Estrutura do Projeto
src/
├── controllers/
│ └── produtoController.js # Lógica das rotas
├── models/
│ └── produtoModel.js # Acesso ao banco
├── routes/
│ └── produtoRoutes.js # Definição de endpoints
├── db/
│ └── connection.js # Config DB
└── index.js # Entry point


## 🌐 Endpoints

| Método | Rota               | Descrição                  |
|--------|--------------------|----------------------------|
| GET    | `/produto`         | Lista todos produtos       |
| GET    | `/produto/:idProd` | Busca produto por ID       |
| POST   | `/produto`         | Cria novo produto          |
| PUT    | `/produto/:idProd` | Atualiza produto           |
| DEL    | `/produto/:idProd` | Remove produto             |

## 📝 Exemplos de Uso

### Criar produto (POST /produto)
```
{
  "nome": "Smartphone Samsung",
  "descricao": "Galaxy S23 128GB",
  "preco": 3999.99,
  "quantidade_estoque": 15
}
```
### Resposta (GET /produto/1)
```

{
  "idProd": 1,
  "nome": "Smartphone Samsung",
  "descricao": "Galaxy S23 128GB",
  "preco": "3999.99",
  "quantidade_estoque": 15,
  "data_criacao": "2023-05-20T10:00:00.000Z",
  "data_atualizacao": "2023-05-20T10:00:00.000Z"
}
```

## 🔍 Detalhes da Implementação MVC

### Model (produtoModel.js)
```
const db = require("../db/conection.js");

module.exports = {
    getAll: () => db("produtos"),
    getById: (id) => db("produtos").where("idProd", id).first(),
    create: (produto) => db("produtos").insert(produto),
    update: (id, produto) => db("produtos").where("idProd", id).update(produto),
    remove: (id) => db("produtos").where("idProd", id).del()
};
```
### Controller (produtoController.js)
```
const errors = require("restify-errors");
const Produto = require("../models/produtoModel.js");

module.exports = {
    getAll: async (req, res) => {
        try {
            const produtos = await Produto.getAll();
            res.send(produtos);
        } catch (err) {
            res.send(new errors.InternalServerError(err.message));
        }
    },
    // ... outros métodos
};
```
### Routes (produtoRoutes.js)

```
const controller = require("../controllers/produtoController");

module.exports = (server) => {
    server.get("/produto", controller.getAll);
    server.get("/produto/:idProd", controller.getById);
    server.post("/produto", controller.create);
    server.put("/produto/:idProd", controller.update);
    server.del("/produto/:idProd", controller.remove);
};
```

## Aluno

### Nome Completo: Kauan Guilherme Pinto Dos Santos
### Ra: 12724228176