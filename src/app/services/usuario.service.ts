import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { environment } from '../../environments/environment.prod';

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    token: string = null;

    constructor(private storage: Storage, private http: HttpClient) { }

    login(email: string, password: string) {

        // const data = {email: email, password: password}

        const data = { email, password };

        return new Promise(resolve => {

            // Sólo vamos a trabajar con resolve, no con reject

            this.http.post(`${URL}/user/login`, data).subscribe((resp: any) => {

                console.log(resp.token);

                if (resp.ok) {

                    this.guardarToken(resp.token);

                    resolve(true);

                } else {

                    this.token = null;

                    this.storage.remove('token');

                    resolve(false);

                }

            });

        });

    }

    async guardarToken(token: string) {

        this.token = token;

        await this.storage.set('token', token);

    }
}
