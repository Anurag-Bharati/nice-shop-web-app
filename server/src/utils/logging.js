import fs from "fs";
import path from "path";
import morgan from "morgan";
import rfs from "rotating-file-stream";

// Function to create a rotating write stream for log files
const createLogStream = (routeName, __dirname) => {
    const main = path.join(__dirname, "logs");
    if (!fs.existsSync(main)) fs.mkdirSync(main);
    const logDirectory = path.join(__dirname, "logs", routeName);
    if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);
    return rfs.createStream("access.log", {
        interval: "1d", // Rotate daily
        path: logDirectory,
    });
};

// Middleware to log requests for a specific route
const routeLogger = (routeName, __dirname) => {
    const logStream = createLogStream(routeName, __dirname);
    return morgan("combined", { stream: logStream });
};
export default routeLogger;
