export interface RespuestaMensajes {
    ok: boolean;
    pagina: number;
    mensajes: Mensaje[];
}

export interface Mensaje {
    imgs?: string[];
    _id?: string;
    texto?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
    // __v: number; // Son de Mongo y no hacen falta
}

export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    // __v: number;
}