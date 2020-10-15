import { Injectable } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiServiceService {

    constructor(public alertController: AlertController, public toastController: ToastController) { }

    async alertaInformativa(message: string) {
        const alert = await this.alertController.create({
            /* cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'Subtitle', */
            message, // message: message,
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }

}
