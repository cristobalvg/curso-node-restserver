import express from 'express';
import cors from 'cors';
import { router } from '../routes/usuarios.js';

// un middleware primero que nada es una función. Tal como una función de Javascript, con algunos accesos y virtudes extras.

// Si, si puede manejar los parámetros de los endpoints o rutas, el objeto de la solicitud (req) es uno de los objetos a los cuales el middleware tiene acceso. Adicionalmente, tiene acceso al objeto de respuesta (res) y a la función next() que ejecuta el siguiente control en la ruta.

// Las funciones de middleware pueden realizar las siguientes tareas:
// Ejecutar cualquier código.
// Realizar cambios en la solicitud y los objetos de respuesta.
// Finalizar el ciclo de solicitud/respuestas.
// Invocar la siguiente función de middleware en la pila.
// https://expressjs.com/es/guide/using-middleware.html

// ya tengo mi clase de server, o sea mi server. Si el día de mañana yo necesito crearme otra instancia de express, simplemente un rest-server, simplemente voy a copiar esto, todo el archivo server.js junto con la clase Server, lo pegamos en nuestra aplicación o copiamos este este modelo(server.js) y simplemente lo ejecutamos en donde lo queremos ocupar.
class Server {

    // Dentro del constructor definimos las propiedades de la clase Server y no fuera de de la clase, porque así se suele hacer.
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';// <= Vamos a hacer como que estas son nuestras rutas, esto en un proyecto real en producción es para que cualquier otra persona que venga a ver mi servidor, rápidamente vea cuáles son las rutas que dispone de él.

        // Middlewares, no son más que funciones que van a añadirle otra funcionalidad a mi web server. En pocas palabras, es como una función que siempre va a ejecutarse cuando nosotros levantemos nuestro servidor y ya vamos a ver más de esto cuando realmente utilicemos algún middleware que sea personalizado:
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {

        // CORS. Sabemos que es un middleware, porque los middleware se usan así: app.use, el app.use, ese => .use() <= significa que es un middleware.
        this.app.use(cors())

        // lectura y parseo del body
        this.app.use( express.json() ) // aquí, en este middleware recibimos lo que vamos a enviar a través de la petición POST que vamos a hacer y dentro del this.app.use() escribimos el express.json() que es una función y eso es todo. De esta manera, cualquier información que venga, ya sea en post, put o delete Leeds, inclusive podría ser un get. Pero los get, no reciben esa información del body, pero cualquier información que venga ahí la va a intentar serializar a un formato JSON. Y eso es genial porque es muy fácil trabajar con json en JavaScript De hecho, json nació de los sujetos literales de JavaScript, es un JavaScript Object notation.

        // Directorio Público
        this.app.use( express.static('public')); // use es la palabra clave para decir que esto es un middleware.
        // static = Esta es una función de middleware incorporada en Express. Sirve archivos estáticos y se basa en Serv Serv-Static.

        // 5 years ago, Actualmente el middleware body-parser viene incluido con express, por lo que se podría ahorrar su instalación y usar los middlewares directamente desde express de la misma forma:
        
        // app.use(express.urlencoded({ extended: false })); app.use(express.json());

        // 4 years ago, A partir de la versión 4.8 quitaron algunas funciones middleware del objeto express, y una de ellas fue el body-parser. En la guía de Express también  piden instalar el npm, aquí paso link: "https://expressjs.com/en/guide/migrating-4.html"

        // 3 years ago, Profe, ¿hoy en día es necesario utilizar bodyParser? he visto en la documentación de express que ya trae las herramientas para urlencoded y json. 
        // ¿que seria mejor? =>: app.use(bodyParser.urlencoded({extended:false}) //lo mismo con json()
                            
        // o app.use(express.urlencoded({ extended: false })) // lo mismo con json().

        // Jose 3 years ago No, ya no es estrictamente necesario. Express lo ha incorporado y puedes usar express.urlencoded.

    }

    // los middlewares también podemos colocarlos en las rutas y todo dependiendo del caso de uso.
    routes() {
        
        // De alguna manera nosotros tenemos que configurar estas rutas? A: Pero hay una manera bien interesante que puedo aplicar otro middlewares, pero esto es un middleware al cual le voy a poner ciertas rutas, es decir, cuando pase una solicitud por esta ruta, entonces aquí lo voy a cargar. Es como middleware condicional:


        this.app.use( this.usuariosPath, router ); //<= Pero este router yo lo estoy configurando en /api/usuarios Entonces este es el path que yo voy a ocupar ahora. Por lo cual en el archivos user.js los router.get, put. delete, post o patch, en su ruta, en su path, solo vamos a colocar el / que en teoría, si lo dejaramos así estaríamos accediendo al root = http://localhost:8080, pero aquí es donde estamos configurando este router y este router yo lo estoy configurando en /api/usuarios.
        //<= El 2 argumento es lo que necesitamos mandar a llamar.
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

export { Server }