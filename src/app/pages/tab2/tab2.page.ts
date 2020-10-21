import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MensajesService } from '../../services/mensajes.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    tempImages: string[] = [];

    mensaje = {
        texto: '',
        coords: null,
        posicion: false
    };

    cargandoGeolocalizacion = false;

    constructor(
        private ms: MensajesService,
        private ui: UiServiceService,
        private navCtrl: NavController,
        private geo: Geolocation,
        private camera: Camera,
    ) { }

    async crearMensaje() {

        console.log('crearMensaje', this.mensaje);

        const mensajeCreado = await this.ms.crearMensaje(this.mensaje);

        if (mensajeCreado) {

            this.mensaje = {
                texto: '',
                coords: null,
                posicion: false
            };

            this.tempImages = [];

            this.ui.presentToast('Mensaje creado con éxito');

            // Navegar a tab1 para ello vamos a utilizar NavController

            this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

            // Tambien se puede hacer con Router de Angular importando route: Router
            // this.route.navigateByUrl('/main/tabs/tab1')

        } else {

            this.ui.presentToast('No se pudo crear el mensaje');

        }
    }

    getGeolocalizacion() {

        if (!this.mensaje.posicion) {

            this.mensaje.coords = null;

            this.cargandoGeolocalizacion = false;

        } else {

            this.cargandoGeolocalizacion = true;

            this.geo.getCurrentPosition().then((resp) => {

                this.cargandoGeolocalizacion = false;

                console.log('coordenadas: ', `${resp.coords.latitude},${resp.coords.longitude}`);

                this.mensaje.coords = `${resp.coords.latitude},${resp.coords.longitude}`;

            }).catch((error) => {

                this.cargandoGeolocalizacion = false;

                console.log('Error getting location', error);

            });

        }

    }

    tomarFoto() {

        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA
        };

        this.procesarImagen(options);

    }

    escogerFotoGaleria() {

        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };

        this.procesarImagen(options);

    }

    procesarImagen(options: CameraOptions) {

        this.camera.getPicture(options).then((imageData) => {

            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            // let base64Image = 'data:image/jpeg;base64,' + imageData;

            // Vamos a usar el WebView de Ionic

            // Declaramos arriba window para que TS no marque error

            const img = window.Ionic.WebView.convertFileSrc(imageData); // funciona para IOS y Android

            console.log('imagen: ', img);

            this.ms.subirImagen(imageData);

            this.tempImages.push(img);

        }, (err) => {

            // Handle error

        });

    }

}
