import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    avatars = [
        {
            img: 'av-1.png',
            seleccionado: true
        },
        {
            img: 'av-2.png',
            seleccionado: false
        },
        {
            img: 'av-3.png',
            seleccionado: false
        },
        {
            img: 'av-4.png',
            seleccionado: false
        },
        {
            img: 'av-5.png',
            seleccionado: false
        },
        {
            img: 'av-6.png',
            seleccionado: false
        },
        {
            img: 'av-7.png',
            seleccionado: false
        },
        {
            img: 'av-8.png',
            seleccionado: false
        },
    ];

    /* mainSlideOptions = {
        allowSlidePrev: false,
        allowSlideNext: false
    }; */

    avatarSlideOpts = {
        slidesPerView: 3.5
    };

    @ViewChild('mainSlide', { static: true }) slider: IonSlides;

    // PROBLEMA: slideOpts es ignorado la primera vez que se abre la modal,
    // la solución es mostrar el slider cuando se ha renderizado la modal > ionViewDidEnter
    viewEntered = false;

    loginUser = {
        email: 'dan@awandor.com',
        password: 'algo'
    };

    formIsValid = false;

    constructor(private us: UsuarioService, private navCtrl: NavController, private ui: UiServiceService) { }

    ngOnInit() {

        this.slider.lockSwipes(true);

    }

    ionViewDidEnter() {

        this.viewEntered = true;

    }

    async login(form: NgForm) {

        console.log(form.valid);

        console.log(this.loginUser);

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

    registrar(form: NgForm) {

        console.log(form.valid);
    }

    seleccionarAvatar(avatar) {

        this.avatars.forEach(av => {

            av.seleccionado = false;

        });

        avatar.seleccionado = true;

    }

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
}
