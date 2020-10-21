import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/interfaces';
import { MensajesService } from '../../services/mensajes.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    mensajes: Mensaje[] = [];

    buscando = false;

    constructor(public ms: MensajesService, public us: UsuarioService) { }

    ngOnInit() {

        /* this.ms.getMensajes().subscribe(resp => {

            console.log(resp);

            this.mensajes.push(...resp.mensajes);
        }); */

        this.cargarSiguientePagina();

        this.ms.nuevoMensaje.subscribe((resp: Mensaje) => {

            this.mensajes.unshift(resp);

        });

    }

    cargarSiguientePagina(evento?: any, pull: boolean = false) {

        // console.log(evento);

        this.ms.getMensajes(pull).subscribe(resp => {

            console.log(resp);

            if (evento) {

                evento.target.complete();

            }

            if (resp.mensajes.length === 0) {

                // Desactivar infinite scroll

                evento.target.disabled = true;
                evento.target.complete(); // es el mismo método para Infinite Scroll que para Refresher
                return;

            }

            this.mensajes.push(...resp.mensajes);

            this.buscando = false;

        });

    }

    refrescar(evento: any) {

        this.cargarSiguientePagina(evento, true);

        this.mensajes = [];

        this.buscando = true;

    }

}
