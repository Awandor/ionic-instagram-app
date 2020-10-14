import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaMensajes } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class MensajesService {

    paginaMensaje = 0;

    constructor(private http: HttpClient) { }

    getMensajes(pull: boolean = false) {

        if (pull) {

            this.paginaMensaje = 0;

        }

        this.paginaMensaje++;

        return this.http.get<RespuestaMensajes>(`${URL}/messages?pagina=${this.paginaMensaje}`);

    }
}
