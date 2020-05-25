require("dotenv").config();
const app = require("./app");
const server = require("http").createServer(app);

const PORT = process.env.PORT || 1010;

server.listen(PORT, () => console.log("Server listening on port: " + PORT));
