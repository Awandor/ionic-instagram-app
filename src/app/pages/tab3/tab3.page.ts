import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { NavController } from '@ionic/angular';
import { MensajesService } from '../../services/mensajes.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    usuario: Usuario = {};

    constructor(public us: UsuarioService, private ui: UiServiceService, private navCtrl: NavController, private ms: MensajesService) { }

    ngOnInit() {

        this.usuario = this.us.obtenerUsuarioActivo();

    }

    async actualizarUsuario(formularioEditarUsuario: NgForm) {

        if (formularioEditarUsuario.invalid) {

            return;

        }

        const actualizado = await this.us.actualizarUsuarioActivo(this.usuario);

        console.log('actualizarUsuario', actualizado);

        if (actualizado) {

            this.ui.presentToast('Usuario actualizado con éxito');

            // Navegar a tab1 para ello vamos a utilizar NavController

            this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

        } else {

            // Mostar alerta

            this.ui.presentToast('No se pudo actualizar');
        }

    }

    getAvatar(img: string) {

        console.log('getAvatar', img);

        this.usuario.avatar = img;

    }

    logout() {

        this.us.logout();

        this.ms.paginaMensaje = 0;

    }

}
