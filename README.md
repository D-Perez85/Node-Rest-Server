# NODE REST SERVER

>#### Servidor que muestra contenido http + endpoints
Tiene también como funcionalidad retornar info a través de dichos endpoints, los cuales son en formato JSON.



>#### APLICACION
	Tener las bases de como se inicia en el mundo de Node JS, siguiendo los siguientes STEPS: 
    - crear un servidor local, 
    - configurar su entorno con Express, 
    - creacion de models, routes y controllers
    - middlewares
    - endpoints
    - request & response
    - pruebas en Postman


## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.


### Instalación 🔧

### `Clonar` 
Clonar el proyecto utilizando git clone  dentro de tu entorno local para poder obtener el codigo fuente. 
```
git clone https://github.com/D-Perez85/Node-Rest-Server.git
```
### `Instalar Dependencias`
Instala las dependencias necesarias para poder correr la App...
```
npm install
```
### `Configurar Database` 

	o loguearse en MongoAtlas, crear proyecto y clúster (Database)
	o configurar user y password (Database Access), agregarlas en .env del codigo fuente
	o configurar los datos IP del clúster en 0.0.0.0/0 (config por default)
	o elegir tipo de conexion (Mongo Compass), click en conexion, copiar srv de la misma
	o agregar ese srv en .env, reemplazar user y password del mismo por los nuestros
	o abrir Mongo Compas, ejecutar el srv en URI de conexión

### `Run`
Una vez instaladas las dependencias podras correr la App en el directorio del proyecto. 
Una vez compilado podras ver el resultado en http://localhost:8080/
Si quieres cambiar el nro de puerto deberas configurar la variable PORT del archivo .env con el que desees. 
```
nodemon app.js / node app.js
```



## Learn More About Node Js

You can learn more in the [Node Started Guide](https://nodejs.org/en/docs/guides/getting-started-guide/)

To learn React, check out the [Node documentation](https://nodejs.org/es/).

##
Made with ❤️ by [Damian Perez](https://github.com/D-Perez85) 😊
