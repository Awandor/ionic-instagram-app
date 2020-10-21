import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    token: string = null;

    private usuario: Usuario = {}; // No queremos que se pueda leer o alterar desde fuera

    constructor(private storage: Storage, private http: HttpClient, private navCtrl: NavController) { }

    login(email: string, password: string) {

        // const data = {email: email, password: password}

        const data = { email, password };

        return new Promise(resolve => {

            // Sólo vamos a trabajar con resolve, no con reject

            this.http.post(`${URL}/user/login`, data).subscribe(async (resp: any) => {

                console.log(resp.token);

                if (resp.ok) {

                    await this.guardarToken(resp.token);

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

        await this.validarToken();

    }

    crearUsuario(usuario: Usuario) {

        const data = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            avatar: usuario.avatar
        };

        return new Promise(resolve => {

            this.http.post(`${URL}/user/create`, data).subscribe(async (resp: any) => {

                if (resp.ok) {

                    await this.guardarToken(resp.token);

                    resolve(true);

                } else {

                    this.token = null;

                    this.storage.remove('token');

                    resolve(false);

                }

            });

        });

    }

    async validarToken(): Promise<boolean> {

        await this.cargarToken();

        if (!this.token) {

            this.navCtrl.navigateRoot('/login');

            return Promise.resolve(false);

        }

        // Vamos a ver si está en el Storage

        return new Promise<boolean>((resolve, reject) => {

            // Usamos el método Obtener usuario del backend, enviamos token por headers y el backend responde con OK true o false

            const headers = new HttpHeaders({
                'x-token': this.token
            });

            this.http.get(`${URL}/user/`, { headers }).subscribe((resp: any) => {

                if (resp.ok) {

                    this.usuario = resp.usuario;

                    resolve(true);

                } else {

                    this.navCtrl.navigateRoot('/login/');

                    resolve(false);

                }
            });
        });
    }

    async cargarToken() {

        // Cargamos el token para poder leerlo en otros lugares

        this.token = await this.storage.get('token') || null;

    }

    obtenerUsuarioActivo() {

        if (!this.usuario._id) {

            this.validarToken(); // Si el token no es válido nos llevará al login

        }

        return { ...this.usuario };

    }

    actualizarUsuarioActivo(usuario: Usuario) {

        const headers = new HttpHeaders({
            'x-token': this.token
        });

        const data = {
            nombre: usuario.nombre,
            email: usuario.email,
            // password: usuario.password,
            avatar: usuario.avatar
        };

        return new Promise(resolve => {

            this.http.post(`${URL}/user/edit`, data, { headers }).subscribe(async (resp: any) => {

                if (resp.ok) {

                    await this.guardarToken(resp.token);

                    resolve(true);

                } else {

                    this.token = null;

                    this.storage.remove('token');

                    resolve(false);

                }

            });

        });

    }

    logout() {

        // Limpiamos el token

        this.token = null;

        // Limpiamos el usuario

        this.usuario = null;

        // Limpiamos el token del Storage

        this.storage.remove('token');

        // Movemos al usuario a la pantalla de login

        this.navCtrl.navigateRoot('/login', { animated: true });

    }
}
