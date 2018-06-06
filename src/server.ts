import * as http from 'http';

import Server from "./app/ExpressServer";


const port = process.env.port || 3000;

const mainServer:http.Server = http.createServer(Server);


mainServer.listen(port,()=>{
    console.log(`Server is connected on ${port}`);
})