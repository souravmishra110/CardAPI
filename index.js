import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'


import cardsRoutes from "./routes/cards.js";
import adminRoutes from "./routes/admin.js";
import crypto from 'crypto'

import {  authenticateToken } from './controllers/jwtControllers.js'


const app = express();
const PORT = process.env.PORT;//remove 3000 when pushing into production

// get config vars
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    process.env.DB_CONNECTION_KEY,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

app.use("/cards",  cardsRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => res.send("Welcome to the Cards API!"));

app.get("/validate", authenticateToken, (req, res) => {
    res.json({
        validate: "Done..."
    })
})

app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
