# Backend MERN - Calendar

Backend para el proyecto "Calendar", que utiliza Node.js, Express y MongoDB.

Aplicación desplegada en: [mern-calendar-tatiana](https://mern-calendar-tatiana.herokuapp.com/)

Para ver los logs desde la terminal de Heroku:

    heroku logs --tail

# Instalaciones necesarias

## Node

Crear package.json con la configuracion por defecto

    npm init -y

Para ver los cambios en la consola ponemos:

    node index.js

Habria que ejecutar ese comando cada vez que cambiemos algo.

Para que esto se haga solo, instalamos nodemon

    npm i nodemon -g

Entonces podemos escribir 

    nodemon index.js

y cada vez que haya un cambio se ejecuta solo.

Modificamos los scripts en el package.json y ahora para ejecutar el modo producción ponemos:

    npm start

Y el modo desarrollo ponemos:

    npm run dev

## Express

    npm i express

Para poner la versión que necesitamos en este proyecto:

    npm i express@4.17.1

Para hacer validaciones

    npm i express-validator

## Variables de entorno

Creamos el archivo .env para crear las variables de entorno

Para que funcione instalamos:

    npm i dotenv


## MongoDB

MongoDB Atlas, es el servicio de MongoDB en la nube.
Mongoose es un Object Document Mapper (ODM) que hace más fácil trabajar con MongoDB.

    npm i mongoose

## Encriptar contraseñas en la BBDD

    npm i bcryptjs

## JWT

Para generar un token cuando el usuario esté logueado.

    npm i jsonwebtoken

## CORS

    npm install cors

## Fechas

    npm i moment