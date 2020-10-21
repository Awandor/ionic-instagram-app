import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenUrlPipe } from './imagen-url.pipe';

@NgModule({
    declarations: [DomSanitizerPipe, ImageSanitizerPipe, ImagenUrlPipe],
    imports: [
        CommonModule
    ],
    exports: [
        DomSanitizerPipe,
        ImageSanitizerPipe,
        ImagenUrlPipe
    ]
})
export class PipesModule { }
