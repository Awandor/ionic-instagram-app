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


## Servicio crear nuevos usuarios

En `interfaces` añadimos al `Usuario` la propiedad `password`

En `usuario.service` creamos método de registro


## Componente de selector de Avatar

Creamos un componente personalizado que emita el avatar seleccionado al padre

> `ionic g c components/avatarSelector --spec=false`

No sé porque, pero no ha hecho el update de `components.module`, así que lo importo manualmente.

Para poder usarlo en `login.page` necesitamos importar `ComponentsModule` en `login.module`


## Proteger las rutas cargadas mediante lazyload

En Angular podemos proteger las rutas mediante Guards

> `ionic g guard guards/usuario --skipTests=true` Seleccionamos Can Load (es para páginas cargadas mediante lazyload)

Lo implementamos en `app-routing.module`

Ahora en `usuario.service` implementamos un método que verifique el token y si es correcto el guard va a dejar pasar

Desde usuario.guard llamamos el método


## Editar un usuario

Trabajamos la página `tab3`. Vamos a usar el componente `avatar-selector` así que importamos `ComponentsModule` en `tab3.module`

Necesitamos los datos nombre, email y avatar, los podemos obtener usando el token para llamar al backend

En `usuario.service` tenemos los datos del usuario en la propiedad usuario pero no es conveniente leer las propiedades del usuario
directamente porque todos los objetos en javaScript son pasados por referencia de modo que si cambio el email o el nombre, aunque no
toque el botón actualizar, sí se van a modificar de forma global en la app, no en la base de datos pero puede dar problemas.

Por ello vamos a crear un método en `usuario.service` para obtener los datos de usuario, creando un nuevo objeto

Llamamos al método desde `tab3` y obtenemos los datos del usuario

En `usuario.service` creamos un método para actualizar los datos de un usuario


## Crear un nuevo mensaje

Trabajamos la página `tab2`.

Creamos método para crear mensajes en `mensajes.service`

Cuando se ha creado el mensaje como ya hemos pasado por `tab1` forzosamente, se ha disparado el `ngOnInit` que refresca la lisa de mensajes

No queremos refrescar la lista al volver al `tab1` pues rompemos la paginación y desde un punto de vista de UX está mal.

Para que veamos el último mensaje creado en la primera posición estemos en la página que sea de la lista de mensajes necesitamos
crear un observable que me permita emitir nuevos mensajes a `tab1`

Vamos a mensajes.service y creamos un event emitter que cuando se crea un mensaje nuevo exitosamente se emita ese mensaje

En tab1 vamos a crear en `ngOnInit` un suscriptor que escuche el event emitter, cuando llega un mensaje nuevo simplemente lo añade
al arreglo de mensajes en la primera posición.

Ahora en `tab2` cuando termine de crear en base de datos el nuevo mensaje limpiamos el campo texto y navegamos a `tab1`

Para ello vamos a `mensajes.service` y transformamos nuestro método de crear mensaje para que retorne una Promesa que resuelve true o false
así en `tab2` sabremos cuando ha terminado con éxito


## Geolocalización

En `tab2` cuando hacemos check se dispara el método que recoge la geolocalización del dispositivo

Documentación > `https://ionicframework.com/docs/native/geolocation`

> `ionic cordova plugin add cordova-plugin-geolocation`

> `npm install @ionic-native/geolocation`

Importamos `Geolocation` en `app.module`

Importamos en tab2 y lo inyectamos en el constructor

Para asegurarnos que el usuario no envíe el mensaje antes de que haya terminado la geolocalización deshabilitamos el botón mientras esté cargando

Hay muchas opciones en `https://github.com/apache/cordova-plugin-geolocation`


## Geolocalización IOS

Para que funcione en IOS hay que añadir a `configuration.xml`

<edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
   <string>We use your location for full functionality of certain app features.</string>
</edit-config>


## Mapa

Creamos un componente > `ionic g c components/mapa --spec=false`

No sé porque, pero no ha hecho el update de `components.module`, así que lo importo manualmente

En `mensaje.component` añadimos el componente y le pasamos las coordenas

`www.mapbox.com` Nos registramos para crear cuenta y acceder a la API Key

pk.eyJ1IjoiYXdhbmRvciIsImEiOiJja2ZwcXd3cmYwN3h0MzVycGFvbmNwNzV1In0._A55aLztLaXI8s5sDqe69w

Vamos a la documentación de Mapbox > Dashboard > Install Maps SDK para Web JS > CDN

Copiamos y pegamos el estilo y la librería js en index y vamos a next

Copiamos la inizialización del mapa en mapa, usaremos el ciclo de vida de Angular ngAfterViewInit


## Capturar foto

Documentación > `https://ionicframework.com/docs/native/camera`

> `ionic cordova plugin add cordova-plugin-camera`

> `npm install @ionic-native/camera`

Importamos `Camera` en `app.module`

Importamos en `tab2` e inyectamos en el constructor

Creamos método camera y metemos el código según la documentación, añadimos unas opciones


## Ajuste para IOS

En la documentación del plugin > `https://github.com/apache/cordova-plugin-camera`

Vamos a la parte de IOS y copiamos todo lo que hay que pegar en config.xml

También hay que aplicar DomSanitizer a las imágenes porque IOS considera la url como insegura

Para ello vamos a `platforms/ios` y abrimos `NombreApp.xcode` algo de teams?

Vamos a pasar las imágenes por un DomSanitizer específico para urls, para ello creamos un pipe para poder
reutilizarlo.

> `ionic g pipe pipes/imageSanitizer --skipTests=true`

Para poder utilizarlo debemos asegurarnos de que está siendo exportado en `pipes.module`

En `tab2.module` importamos `PipesModule`

En `tab2.page` en el HTML pasamos la imagen por el pipe `imageSanitizer`


## Escoger imagen de la galería

Podemos usar el mismo método de tomarFoto y cambiar PictureSourceType.CAMERA por PictureSourceType.PHOTOLIBRARY

O podemos usar un plugin nativo `Image Picker` > `https://ionicframework.com/docs/native/image-picker`

No lo vamos a usar porque en el momento de la grabación del curso 2019 el plugin da error en IOS


## Llamar al servicio para subir las imágenes al servidor

Para poder mandar un archivo necesitamos el plugin nativo File Transfer > `https://ionicframework.com/docs/native/file-transfer`

> `ionic cordova plugin add cordova-plugin-file-transfer`

> `npm install @ionic-native/file-transfer`

Importamos `FileTransfer` en `app.module`

Importamos en `tab2` e inyectamos en el constructor

Lo vamos a trabajar como servicio para centralizarlo en `mensajes.service`

Creamos método subirImagen y metemos el código según la documentación, añadimos unas opciones

Llamamos al método desde `tab2`

Para poder usar `FileTransfer` tenemos que asegurarnos de que la plataforma está cargada y lista, para ello
importamos `Platform` y lo inyectamos en el constructor y en el método para subir imagen metemos
`this.platform.ready().then...` y ahí dentro metemos la lógica de `FileTransfer`


## Mostrar imágenes en el mensaje creado

En postman tenemos un servicio que muestra una imagen, vemos que necesitamos concatenar la carpeta que tiene como nombre
el id del usuario de mongo y luego el nombre del archivo, para agilizar creamos un pipe

Creamos un pipe > `ionic g pipe pipes/imagenUrl --skipTests=true`

Para poder utilizarlo debemos asegurarnos de que está siendo importado y exportado en `pipes.module`

También tenemos ya importado `PipesModule` en `components.module`

En `tab2.module` ya tenemos importado `PipesModule`

Aplicamos el pipe a la imagen


## Logout

Vamos a crear la lógica en `usuario.service`, creamos el método `logout` que limpia el token y redirige al login

Importamos e inyectamos `UsuarioService` en `tab1` como public así podemos usarlo diréctamente en el HTML


## Corregir error al crear un nuevo usuario y hacer login con él

El problema es que si vamos a tab3 Actualizar perfil, los datos del usuario se han perdido.

Vamos a `usuario.service` al método `guardarToken` y justo después de guardar el token en el Storage
aplicamos el método `validaToken`

En el método `login` vamos a esperar a que el proceso `guardarToken` se ejecute
y hacemos lo mismo en el método `crearUsuario` y en `actualizarUsuarioActivo`, en todas partes donde se llame `guardarToken`


## Arreglar tab1 para que se vean todos los mensajes

Cuando ingresamos con el nuevo usuario los mensajes no aparecen, pero si hacemos un `pull to refresh` sí aparecen.

Cuando hago el logout e ingreso de nuevo se está intentando cargar la página siguiente, tenemos que restablecer
que la página de mensajes vuelva a ser cero.

La variable `paginaMensaje` está en `mensaje.service`

Lo vamos a hacer en el tab3, no lo podemos hacer en `usuario.service` que es el que tiene el método logout porque `mensaje.service`
depende de `usuario.service` y no podemos hacer una referencia cíclica es decir que el `usuario.service` dependa del `mensaje.service`
y el `mensaje.service` del `usuario.service`

En tab3 importamos MensajeService y seteamos la propiedad `paginaMensaje` a cero dentro del método que hace el logout


## Arreglar que si el usuario ya está logeado vaya directamente a la tab1

Si el token está en el storage es que está logeado.

Mucha gente aplica la lógica en `app.component` en la parte de initializeApp donde se comprueba si existe el token en el Storage
y si es así se redirige a la `tab1`

Como tenemos guards que comprueban en cada página si el usuario tiene un token válido de lo contrario es redirigido al login
vamos a hacer que por defecto en `app-routing.module` el usuario sea dirigido a `main/tabs/tab1` al iniciar la app y así si no está logueado
será redirigido al login, más sencillo.



## Probar en dispositivo

Tenemos que editar `environment.prod` y cambiar url por nuestra IP

Vamos a nuestra conexión a internet y buscamos IPv4 copiamos el valor > `url: 'http://192.168.1.105:3000'`

Esta IP puede cambiar de un día a otro, esto es temporal para hacer la prueba

Cuando subamos el backend a un servidor pondremos la url definitiva

Hacemos lo mismo con `environment`


## Correr la app en un Android real

Conectar el móvil por USB al ordenador. En el móvil tengo que haber activado que soy un desarrollador. 
Entrar en Opciones para desarrolladores > Depuración por USB > ON

Ahora abrir CMD en la carpeta del proyecto > `ionic cordova run --list`

En GIT Bash no funciona

Tomar nota de `Available android devices`, por ejemplo: Xiaomi Mi A1 (API 28) 5e346adb0504
Anotar 5e346adb0504

> `ionic cordova run android --target=5e346adb0504`

> `ionic cordova run android --target=5e346adb0504 -l` para tener live reload!

> `ionic cordova run android -l` Toma por defecto el primer dispositivo si hay varios

Se crea la carpeta `platforms/android` y se van añadiendo archivos y plugins

Esperar a que salga el mensaje: `Run Successful` y termine, es posible que haya que estar viendo la aplicación en el móvil
para que termine.

Es mejor tener Android Studio cerrado pues puede haber problemas con la versión del gradle

Para inspeccionar la app abrir una página en blanco del navegador y abrimos el depurador
Tres puntitos > More Tools > Remote devices

En la parte de la aplicación > Inspect

Ya podemos ver por Consola los mensajes de la app

Si tenemos errores podemos borrar la plataforma android > `ionic cordova platform remove android` y volverla a generar

Borrar la plataforma no borra la carpeta resources


## Resolución de problema Android resource linking failed - AAPT: error: failed writing to ...R.txt

El antivirus bloqueaba AAPT que quiere escribir el archivo R.txt

En un momento saltó el antivirus y le dí a permitir.

Quizás habría que correr `ionic cordova run android` en consola con permisos de Administrador.


## Resolución de problema ERR_CLEARTEXT_NOT_PERMITTED

Editar `network_security_config.xml` debe quedar así

<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
       <trust-anchors>
           <certificates src="system" />
       </trust-anchors>
   </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
</network-security-config>


## Generar APK sin firmar

Vamos a poder instalar la app en cualquier dispositivo con Android siempre y cuando Andriod esté configurado para
poder instalar apps sin firmar

> `ionic cordova build android --prod --release`

Recreará la carpeta `platforms/android`

Termina con el mensaje `Built the following apk(s)`

La APK está en: `platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`

Esta APK sin firmar es la que vamos a utilizar para generar la versión firmada


## Instalar APK sin firmar en Android

Una vez descarguemos un archivo APK, lo siguiente que tendremos que hacer es instalarlo en nuestro sistema.
Antes de comenzar, deberemos habilitar el sistema para que acepte la instalación de aplicaciones que no vengan desde Google Play.

Para ello, nos dirigiremos a `Ajustes` > `Seguridad`. En este submenú aparecerá una opción llamada `Orígenes desconocidos`, la cual tendremos que activar.
En el momento en el vayamos a activarlo, en la pantalla nos aparecerá una advertencia informándonos de los riesgos de instalar aplicaciones que no procedan de la tienda de Google Play.

Nos dirigiremos a la carpeta de descargas de nuestro dispositivo y pulsaremos el archivo APK que queramos instalar. Al hacerlo, se nos aparecerá un menú que nos resume los permisos que requerirá la aplicación. Una vez aceptemos estos permisos, la aplicación se instalará y ya estará disponible en el sistema para ser utilizada.


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