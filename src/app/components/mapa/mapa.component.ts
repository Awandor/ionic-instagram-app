import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
// import * as mapboxgl from 'mapbox-gl';

declare var mapboxgl: any;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

    @Input() coords = '';

    @ViewChild('mapaContainer', { static: true }) mapaContainer: any;

    map: any;

    lat: number;
    lng: number;

    constructor() { }

    ngOnInit() {

        const latLng = this.coords.split(',');
        this.lat = Number(latLng[0]);
        this.lng = Number(latLng[1]);

    }

    ngAfterViewInit() {

        // mapboxgl viene de la librería Mapbox pero aquí no lo reconoce, vamos a declararla antes del componente

        mapboxgl.accessToken = 'pk.eyJ1IjoiYXdhbmRvciIsImEiOiJja2ZwcXd3cmYwN3h0MzVycGFvbmNwNzV1In0._A55aLztLaXI8s5sDqe69w';

        // crear instancia del mapa

        this.map = new mapboxgl.Map({
            container: this.mapaContainer.nativeElement,
            // container: 'mapaContainer',
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 13,
            center: [this.lng, this.lat],
            dragRotate: false,
            dragPan: false,
            scrollZoom: false,
            doubleClickZoom: false,
            touchZoomRotate: false,
            antialias: false
        });

        // marcador en las coordenadas del post

        const marker = new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);

        this.map.on('load', () => {

            // Usamos este método de Mapbox para ajustar el tamaño del mapa a la pantalla
            this.map.resize();

        });
    }

    // llamado desde componente padre con @viewchild

    mapaInteractivo(activacion: boolean) {

        // activar o desactivar dragPan en el mapa

        if (activacion) {

            this.map.dragPan.enable();
            this.map.scrollZoom.enable();
            this.map.doubleClickZoom.enable();
            this.map.touchZoomRotate.enable();

        } else {

            this.map.dragPan.disable();
            this.map.scrollZoom.disable();
            this.map.doubleClickZoom.disable();
            this.map.touchZoomRotate.disable();

        }
    }

}
