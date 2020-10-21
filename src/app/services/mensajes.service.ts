import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaMensajes, Mensaje } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';

// import { File } from '@ionic-native/file/ngx';

// UI Loading + Toast
import { LoadingController, ToastController } from '@ionic/angular';

// Manejo de errores
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class MensajesService {

    paginaMensaje = 0;

    nuevoMensaje = new EventEmitter<Mensaje>();

    loading: any; // indicador progreso de carga de imagen

    constructor(
        private http: HttpClient,
        private us: UsuarioService,
        public platform: Platform,
        /* private file: File, */
        private transfer: FileTransfer,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController) {

    }

    getMensajes(pull: boolean = false) {

        if (pull) {

            this.paginaMensaje = 0;

        }

        this.paginaMensaje++;

        return this.http.get<RespuestaMensajes>(`${URL}/messages?pagina=${this.paginaMensaje}`);

    }

    crearMensaje(mensaje: Mensaje) {

        const headers = new HttpHeaders({
            'x-token': this.us.token
        });

        const data = {
            texto: mensaje.texto,
            coords: mensaje.coords
        };

        return new Promise(resolve => {

            this.http.post<Mensaje>(`${URL}/messages/`, data, { headers }).subscribe((resp: any) => {

                if (resp.ok) {

                    this.nuevoMensaje.emit(resp.mensaje);

                    resolve(true);

                } else {

                    resolve(false);
                }
            });

        });

    }

    subirImagen(img: any) {

        this.platform.ready().then(resp => {

            console.log('platform', resp);

            const options: FileUploadOptions = {
                fileKey: 'image', // propiedad del Body definida en el backend para subir archivo
                headers: {
                    'x-token': this.us.token
                }
            };

            const fileTransfer: FileTransferObject = this.transfer.create();

            fileTransfer.upload(img, `${URL}/messages/upload`, options)
                .then((data) => {

                    console.log('subirImagen respuesta del backend del servicio Rest', data); // respuesta del backend del servicio Rest

                }).catch(err => {

                    console.log('Error en la subida de archivo', err);
                });

        });

        /* const formData = new FormData();

        const image = img.target.files[0];

        formData.append('files[]', image);

        console.log(formData, image);

        this.http.post(`${URL}/messages/upload`, formData)
            .subscribe((data: any) => {
                console.log(data);
            }); */

    }

    // manejo de errores
    private handleError(error: any) {
        const errMsg = error.message ? error.message : error.toString();
        return throwError(errMsg);
    }

    // informar al usuario con Toast
    private async showToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2500,
            position: 'top'
        });
        toast.present();
    }
}
