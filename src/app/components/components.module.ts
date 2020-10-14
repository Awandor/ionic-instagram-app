import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeComponent } from './mensaje/mensaje.component';
import { IonicModule } from '@ionic/angular';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        MensajeComponent,
        MensajesComponent
    ],
    imports: [
        CommonModule,
        IonicModule, // Para poder usar los componente de Ionic
        PipesModule
    ],
    exports: [
        // MensajeComponent, // No se exporta está incorporado en MensajesComponent
        MensajesComponent
    ]
})
export class ComponentsModule { }
