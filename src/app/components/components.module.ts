import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeComponent } from './mensaje/mensaje.component';
import { IonicModule } from '@ionic/angular';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
    declarations: [
        MensajeComponent,
        MensajesComponent,
        AvatarSelectorComponent,
        MapaComponent
    ],
    imports: [
        CommonModule,
        IonicModule, // Para poder usar los componente de Ionic
        PipesModule
    ],
    exports: [
        // MensajeComponent, // No se exporta está incorporado en MensajesComponent
        MensajesComponent,
        AvatarSelectorComponent
    ]
})
export class ComponentsModule { }
