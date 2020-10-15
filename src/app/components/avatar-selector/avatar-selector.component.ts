import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-avatar-selector',
    templateUrl: './avatar-selector.component.html',
    styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit, AfterViewInit {

    // PROBLEMA: slideOpts es ignorado la primera vez que se abre la modal,
    // la solución es mostrar el slider cuando se ha renderizado la modal > ionViewDidEnter
    viewEntered = false;

    avatarSlideOpts = {
        slidesPerView: 3.5
    };

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

    @Output() avatarid = new EventEmitter<string>();

    @Input() avatarRecibido: string;

    constructor() { }

    ngOnInit() {

        if (this.avatarRecibido) {

            this.avatars.forEach(av => {

                if (av.img === this.avatarRecibido) {

                    av.seleccionado = true;

                } else {

                    av.seleccionado = false;

                }

            });

        }

    }

    ngAfterViewInit(): void {
        this.viewEntered = true;

        console.log('ngAfterViewInit', this.viewEntered);
    }

    seleccionarAvatar(avatar) {

        this.avatars.forEach(av => {

            av.seleccionado = false;

        });

        avatar.seleccionado = true;

        this.avatarid.emit(avatar.img);

    }

}
