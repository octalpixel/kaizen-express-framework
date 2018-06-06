"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const ExpressServer_1 = require("./app/ExpressServer");
const port = process.env.port || 3000;
const mainServer = http.createServer(ExpressServer_1.default);
mainServer.listen(port, () => {
    console.log(`Server is connected on ${port}`);
});
//# sourceMappingURL=server.js.map