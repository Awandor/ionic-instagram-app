import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiServiceService {

    constructor(public alertController: AlertController) { }

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

}
