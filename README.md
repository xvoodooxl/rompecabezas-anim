# gulp-starter-basic

Un paquete liviano para compilar Sass y tener un servidor de desarrollo con refresco de navegador automatico.
Tambien contiene una pequeña arquitectura para emepzar a escribir Sass. Tener en cuenta que esta forma de organizar proyectos esta sujeto a preferncia, sentite libre de editar la estructura a tu gusto.

### Version
1.0.0

## Uso

Una vez instalado se debe editar en los archivos en la carpeta /src que seran luego compilados a la carpeta /public, que es la carpeta que se deberia publicar.

En el archivo .gitignore se ignora la carpeta /public ya que todo el trabajo se deberia hacer en la carpeta /src. Este pack no contiene procesado de imagenes por lo que deberias incluir las imagenes en la carpeta /src para tenerlas en el repositorio.

## Instalacion

### Requerimientos
- NodeJS
- NPM

Descarga los archivos o clona el resitorio. Despues desde una terminal y estando en la carpeta debes instalar las dependencias.
Se instala: gulp, gulp-sass, browser-sync.

Usa el comando:
```sh
$ npm install
```  

### Inicializar
Iniciar el servidor para mirar los archivos, detectar cambios y refrescar el navegador automaticamente.
El servidor se inicia en http://localhost:3000

```sh
$ npm start
```  
