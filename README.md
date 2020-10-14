# Instagram App

App muy parecida a Instagram que consume datos de nuestro backend.

Usaremos la cámara para subir archivos a servicios REST tradicionales, uso de GPS, galería de fotos, autenticación, manejo de usuario, cambio de pantalla root y muchas cosas más.

Implementaremos guards pensados en que todo es cargado mediante lazyload y protección de las rutas a servicios en nuestro backend.

Creamos el proyecto > `ionic start instagram-app tabs`

Levantar el servidor > `ionic serve`

También debemos tener el backend corriendo y el servidor Mongo levantado


## Restructurar tabs

Creamos carpeta pages.

Vamos a mover todos los tabs a `pages` y actualizar `app-routing.module`


## Obtener listado de mensajes

Creamos el servicio > `ionic g s services/mensajes --skipTests=true`

Como vamos a hacer peticiones HTTP necesitamos importar en `app.module` > `HttpClientModule`

Ahora importamos el `HttpClient` en `mensajes.service`

Creamos nuestro primer método para obtener los mensajes

Creamos variables globales en environments para los entry points del backend

Vamos a tab1 donde vamos a listar los mensajes


## Creamos una interface

app > interfaces > `interfaces.ts`

Tomamos como ejemplo de Postman la respuesta de Obtener Mensajes, lo copiamos.

Aplicamos con el Command Palette > JSON to TS: Convert from Clipboard

Añadimos export a los interface, renombramos los nombres de las interface a nuestro gusto

Para evitar tener que hacer muchos ngIf ponemos muchas de las propiedades como opcionales

Podemos aplicar el tipo a la respuesta del servicio en tab1, pero es mejor aplicarlo en el servicio en el get


## Componente Mensaje, Mensajes y Components Module

Lo primero es crear un módulo de componentes para agruparlos

> `ionic g m components`

No hace falta importarlo en ningún lugar

Ahora el primer componente > `ionic g c components/mensaje --spec=false`

No sé porque, pero no ha hecho el update de `components.module`, así que lo importo manualmente.

Como lo vamos a usar fuera del alcance del módulo lo exportamos

Necesitamos importar también `IonicModule`, `PipesModule` en `components.module`

Para poder utilizar el componente en tab1 necesitamos importar `ComponentsModule` en `tab1.module`

Ahora creamos otro componente > `ionic g c components/slideshowPoster --spec=false`

Seguimos los pasos del anterior componente


## DomSanitizer Pipe - Colocar imágenes en el background del slide

Ajustamos estilos y colocamos las imágenes en el background usando style en el HTML, pero si la imágen viene de una variable
en otras versiones de Angular saltaba un error que nos dice que es una práctica insegura y que pasemos la imagen por
el pipe DomSanitizer, aunque no salte error es buena práctica aplicarlo

Creemos el pipe, primero es crear un módulo de pipes para agruparlos > `ionic g m pipes`

No hace falta importarlo en ningún lugar

Ahora creamos el pipe > `ionic g pipe pipes/DomSanitizer --skipTests=true`

Comprobamos que esté importado en `pipes.module`, también tenemos que exportarlo para poder usarlo fuera

Creamos un constructor e inyectamos el servicio de Angular `DomSanitizer`

Lo implementamos retornandolo con el método `bypassSecurityTrustStyle`

Para usarlo en `mensaje.component` tenemos que importar `PipesModule` en `components.module`


## Infinite Scroll

Implementamos Infinite Scroll en `tab1` como dice la documentación de componentes de Ionic


## Refresher: recargar todos los mensajes de nuevo

Documentación > `https://ionicframework.com/docs/api/refresher`


## Login

Creamos página de login > `ionic g page pages/login --spec=false`

Esta página sólo será visible si el usuario no está autenticado de lo contraría será reenviado a `tabs`


En `app-routing.module` cambiamos el path de tabs a `main`

Añadimos un path por defecto que nos redirecciona a `login`

En `login` vamos a trabajar con el formulario por aproximación de templates, añadimos un `ngSubmit` al `form` que dispara
el método `login`. Al formulario le damos el nombre `formLogin`

No hay que importar nada para trabajar con el formulario por aproximación de templates porque ya viene incluido en Ionic

Hay dos formularios, de forma parecida procedemos con el formulario de Registro

En la parte de los Avatars aplicamos ngClass que aplica una clase si se da una condición


## Servicio para manejo de usuario y token

Vamos a crear un servicio que cuando se llama obtiene el token y lo almacenamos en Storage nativo `https://ionicframework.com/docs/angular/storage`

> `ionic g s services/usuario --skipTests=true`

Instalamos el Storage

> `ionic cordova plugin add cordova-sqlite-storage`

> `npm install --save @ionic/storage`

Importamos en `app.module` `IonicStorageModule` y lo añadimos a imports `IonicStorageModule.forRoot()`

`forRoot` indica que es una colección de servicios

Después lo inyectamos en el servicio

Como vamos a hacer peticiones HTTP necesitamos importar en `app.module` > `HttpClientModule`, ya está importado de antes

Ahora importamos el `HttpClient` en `usuario.service`

Creamos el método login, debe de ser capaz de obtener el token y almacenarlo en una propiedad

Llamamos el método desde `login.page`

Ya recibimos el token

Si no funciona hay que bajar y levantar el servidor


## Almacenar el token en Storage nativo

Creamos en `usuario.service` un método que guarda el token y que al guardarlo naveguemos a `tab1`

Para ello lo manejaremos con una promesa que cuando se resuelve correctamente navegamos.


## Servicio centralizado de alertas, toasts

> `ionic g s services/uiService --skipTests=true`

Vamos a usar Alert de Ionic vamos a la documentación, importamos AlertController y lo inyectamos en el constructor






# GIT

En nuestra cuenta de github creamos un repositorio

Si no tenemos repositorio git local lo creamos > `git init`

Si no tenemos archivo `.gitignore` lo creamos, especialmente para evitar `node_modules`

Añadimos los cambios a GIT> `git add .`
Commit > `git commit -m "Primer commit"`

Si en este punto borro accidentalmente algo puedo recuperarlo con > `git checkout -- .`

Que nos recontruye los archivos tal y como estaban en el último commit.

Enlazamos el repositorio local con un repositorio externo en GitHub donde tenemos cuenta y hemos creado un repositorio
`git remote add origin https://github.com/Awandor/ionic-instagram-app.git`

Situarnos en la rama master > `git branch -M master`

Subir todos los cambios a la rama master remota > `git push -u origin master`

Para reconstruir en local el código de GitHub nos bajamos el código y ejecutamos `npm install` que instala todas las dependencias


## Tags y Releases

Crear un tag en Github y un Release

> `git tag -a v1.0.0 -m "Versión 1 - Lista para producción"`

> `git tag` muestra los tags

> `git push --tags` > sube los tags al repositorio remoto

En github vamos a Tags > Add release notes