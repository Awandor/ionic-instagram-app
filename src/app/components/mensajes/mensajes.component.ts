import { Component, Input, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/interfaces';

@Component({
    selector: 'app-mensajes',
    templateUrl: './mensajes.component.html',
    styleUrls: ['./mensajes.component.scss'],
})
export class MensajesComponent implements OnInit {

    @Input() mensajes: Mensaje[] = [];

    constructor() { }

    ngOnInit() {

        console.log('Mensajes recibidos del padre en componente mensajes', this.mensajes);
    }

}
