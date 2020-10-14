import { Component, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/interfaces';

@Component({
    selector: 'app-mensaje',
    templateUrl: './mensaje.component.html',
    styleUrls: ['./mensaje.component.scss'],
})
export class MensajeComponent implements OnInit {

    @Input() mensaje: Mensaje = {};

    perro1 = './assets/perro-1.jpg';

    constructor() { }

    ngOnInit() {

        console.log('Mensaje recibido del padre en componente mensaje', this.mensaje);
    }

}
