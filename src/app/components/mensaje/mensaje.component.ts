import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Mensaje } from '../../interfaces/interfaces';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
    selector: 'app-mensaje',
    templateUrl: './mensaje.component.html',
    styleUrls: ['./mensaje.component.scss'],
})
export class MensajeComponent implements OnInit {

    @Input() mensaje: Mensaje = {};

    // perro1 = './assets/perro-1.jpg';

    // mapear el componente child para llamar un metodo suyo
    @ViewChild(MapaComponent, { static: false }) mapaComponent: MapaComponent;

    // controlar interactividad con el mapa
    activarMapa = false;

    // color del boton para activar mapa
    estadoMapa = 'dark';

    slidesOneSlideOpts = {
        allowSlideNext: false,
        allowSlidePrev: false
    };

    constructor() { }

    ngOnInit() {

        // console.log('Mensaje recibido del padre en componente mensaje', this.mensaje);

        // console.log('typeof this.mensaje.imgs[0]', typeof this.mensaje.imgs[0]);

    }

    mapaInteractivo() {

        // cambiar estado del boton
        this.activarMapa = !this.activarMapa;

        // cambiar color del icon que activa/desactiva drag/scroll del mapa
        if (this.activarMapa) {

            this.estadoMapa = 'success';

        } else {

            this.estadoMapa = 'dark';

        }

        // llamar metodo en componente child
        this.mapaComponent.mapaInteractivo(this.activarMapa);

    }

}
