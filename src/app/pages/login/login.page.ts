import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    /* mainSlideOptions = {
        allowSlidePrev: false,
        allowSlideNext: false
    }; */

    @ViewChild('mainSlide', { static: true }) slider: IonSlides;

    loginUser: Usuario = {
        email: 'dan@awandor.com',
        password: 'algo'
    };

    registerUser: Usuario = {
        nombre: '',
        email: '',
        password: ''
    };

    formIsValid = false;

    avatarid: string = 'av-1.png';

    constructor(private us: UsuarioService, private navCtrl: NavController, private ui: UiServiceService) { }

    ngOnInit() {

        this.slider.lockSwipes(true);

    }

    async login(form: NgForm) {

        // console.log(form.valid);

        // console.log(this.loginUser);

        if (form.invalid) {

            return;

        }

        const valido = await this.us.login(this.loginUser.email, this.loginUser.password);

        if (valido) {

            // Navegar a tab1 para ello vamos a utilizar NavController

            this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

        } else {

            // Mostar alerta

            this.ui.alertaInformativa('Usuario y/o contraseña no son válidos');
        }
    }

    async registrar(form: NgForm) {

        // console.log(form.valid);

        console.log('registrar', this.avatarid);

        if (form.invalid) {

            return;

        }

        this.registerUser.avatar = this.avatarid;

        // console.log('registerUser', this.registerUser);

        const valido = await this.us.crearUsuario(this.registerUser);

        if (valido) {

            this.ui.alertaInformativa(`Usuario ${this.registerUser.email} creado correctamente`);

            // Navegar a tab1 para ello vamos a utilizar NavController

            this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

        } else {

            // Mostar alerta

            this.ui.alertaInformativa('El email ya existe');
        }

    }

    /* seleccionarAvatar(avatar) {

        this.avatars.forEach(av => {

            av.seleccionado = false;

        });

        avatar.seleccionado = true;

    } */

    goIngresar() {

        this.slider.lockSwipes(false);
        this.slider.slideTo(0);
        this.slider.lockSwipes(true);

    }

    goRegistrarme() {

        this.slider.lockSwipes(false);
        this.slider.slideTo(1);
        this.slider.lockSwipes(true);

    }

    getAvatar(img: string) {

        console.log('getAvatar', img);

        this.avatarid = img;

    }
}
