import express, { NextFunction, Request, Response } from "express";


const app = express();

app.get('/', (req: Request, res : Response, nect : NextFunction) => {
    res.send('hello world!');
});

app.listen(1234, ()=>{
    console.log(`
    ########################################
    #   server listening on port : 1234    #
    ########################################         
    `);
});