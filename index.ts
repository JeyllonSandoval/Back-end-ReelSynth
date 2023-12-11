import { ApolloServer } from "apollo-server-express";
import express from "express";
import { PORT } from "./config";
import typeDefs from "./Schemas/index";
import resolvers from "./Resolvers/index";
import CuevanaScrapingPuppeteer from "./utils/Scraping/Cuevana-puppeteer";
import morgan from "morgan"
import { connectDB } from "./db";
const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/movie", async (req, res) => {
    if (!req.body.url) res.status(400).json({ message: "url is required" });
    console.log(req.body);
    const url = req.body.url;

    const data = await CuevanaScrapingPuppeteer(url);
    res.status(200).json(data);
});

// Crea una instancia de Apollo Server
const svrApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers["x-token"] || "";
        return { req, token };
    },
});

await svrApollo.start();

await svrApollo.applyMiddleware({ app });

connectDB();

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/graphql`);
});
