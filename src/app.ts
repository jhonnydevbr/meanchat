import express from 'express';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import usuarioRoute from './routes/usuario.route';
dotenv.config();

const MONGODBURI = process.env.MONGODB_URI ?? '';

export class App {

    private express: express.Application;
    private porta = process.env.PORTA;
    

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private listen(): void {
        this.express.listen(this.porta, ()=>{
            console.log('Servidor iniciado na porta: ' + this.porta);
        });
    }

    private database(): void {
        mongoose.connect(MONGODBURI).then(() => {
            console.log('Conexão com MongoDB estabelecida com sucesso');
        }).catch(err => {
            console.error('Erro ao conectar ao MongoDB:', err);
        });
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRoute);
    }

}