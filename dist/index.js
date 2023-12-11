"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_1 = __importDefault(require("./Schemas/index"));
const index_2 = __importDefault(require("./Resolvers/index"));
const Cuevana_puppeteer_1 = __importDefault(require("./utils/Scraping/Cuevana-puppeteer"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/movie", async (req, res) => {
    if (!req.body.url)
        res.status(400).json({ message: "url is required" });
    console.log(req.body);
    const url = req.body.url;
    const data = await (0, Cuevana_puppeteer_1.default)(url);
    res.status(200).json(data);
});
// Crea una instancia de Apollo Server
const svrApollo = new apollo_server_express_1.ApolloServer({
    typeDefs: index_1.default,
    resolvers: index_2.default,
    context: ({ req }) => {
        const token = req.headers["x-token"] || "";
        return { req, token };
    },
});
async function start() {
    await svrApollo.start();
    await svrApollo.applyMiddleware({ app });
    (0, db_1.connectDB)();
    app.listen(config_1.PORT, () => {
        console.log(`Servidor iniciado en el puerto ${config_1.PORT}`);
        console.log(`http://localhost:${config_1.PORT}`);
        console.log(`http://localhost:${config_1.PORT}/graphql`);
    });
}
// Inicia el servidor
start();
