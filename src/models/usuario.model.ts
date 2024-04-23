import { Document, Schema, model } from "mongoose";
import { UsuarioInterface } from "../interfaces/usuario.interface";
import bcrypt from 'bcrypt';

interface UsuarioModel extends UsuarioInterface, Document {
    compararSenhas(senha: string): Promise<Boolean>
}

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    }
});

UsuarioSchema.pre<UsuarioModel>('save', async function criptografarSenha() {
    this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', function gerarAvatar() {

    this.avatar = `https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?t=st=1713906965~exp=1713910565~hmac=f74bb474e1109ca74a1428cd2ec1557f6465c6bded89ab9da9012d6eb7f80fbb&w=826`

});

UsuarioSchema.methods.compararSenhas = function (senha: string): Promise<Boolean> {
    return bcrypt.compare(senha, this.senha);
}

export default model<UsuarioModel>('Usuario', UsuarioSchema);