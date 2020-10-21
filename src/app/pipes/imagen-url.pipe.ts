import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
    name: 'imagenUrl'
})
export class ImagenUrlPipe implements PipeTransform {

    transform(img: string, userId: string): string {

        return `${URL}/messages/image/${userId}/${img}`;

    }

}
