import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";

// Config
colors.enable();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => res.send("API IS UP AND RUNNING"));

app.listen(
    PORT,
    console.log(`Started in ${process.env.NODE_ENV}: ${PORT}`.yellow.bold)
);
