import fs from "fs";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/err.mware.js";
import routeLogger from "./utils/logging.js";

// Config
colors.enable();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const app = express();

// Route Logging
app.use("/hi", routeLogger("hi", __dirname));
app.use("/bye", routeLogger("bye", __dirname));

app.get("/hi", (req, res) => res.send("Hello there!"));
app.get("/bye", (req, res) => res.send("Goodbye!"));

app.use(express.json());

// config upload folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => res.send("API IS UP AND RUNNING"));

// Routes Start
app.use(notFound);
app.use(errorHandler);

app.listen(
    PORT,
    console.log(`Started in ${process.env.NODE_ENV}: ${PORT}`.yellow.bold)
);
