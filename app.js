import 'dotenv/config'; 
//.config es para que tome todo nuestro archivo de .env y establezca las variables de entorno
// const app = express() //<= las constantes se leen y funcionan más rápido que las variables let o var... ya que sólo tienen código para ser leídas.

// El rest server es el caso cuando tu servidor está enfocado en presentar APIs al exterior.

// Notas de estudiante del curso de node sección 8: Jose =>: Se trabaja con el patron singleton, al menos para la clase server. Solo se realizara una instancia de la misma y sera usada en multiples ocasiones. Humberto =>: Osea estrictamente cada vez que llamemos a server crearemos una instancia, esto no es singleton ya que no tiene una validación de que si ya existe envíe esa. Leo =>: Humberto tiene mucha razon, para ser singleton debe de controlar que no se cree mas de una instancia.

// en que momento es correcto usar express basado en clases, da mejor rendimiento o es lo mismo que usar node js con solo funciones, no comprendo por que se deba usar las clases si con solo llamar las funciones se da el mismo resultado. A: La diferencia en cuanto a rendimiento es muy poca, como dices funciona casi con el mismo resultado. Pero en cuanto a sintaxis, organización y estructuración de tu proyecto creemos que mejora muchísimo. Se entiende mas y es mas legible, si trabajas en equipo u otro desarrollo desea entender el proyecto sera mas sencillo.

// this.app.use(express.static('public')) :<= Básicamente, esta linea de código esta mandando a renderizar el index.html de la carpeta public, en la ruta principal que es: http://localhost:8080 y por tanto ingora al app.get('/') Es correcto, o me estoy equivocando? A: Es correcto, es la manera de indicarle a express que por defecto se debe renderizar el contenido de la carpeta "public" en la raíz de nuestro proyecto.

// No, no existe una mejor que otra. Simplemente su uso dependerá de como manejas las rutas, con app.get('/') puedes crear mini app que luego se integran a la app principal sin problema. En cambio con route.get('/') simplemente añades rutas a la app principal.





import { Server } from './models/server.js';

const server = new Server();

server.listen(); // <= porque el metodo listen() se ejecuta en el app.js y no dentro del constructor de la clase Server? A: por que si lo llama dentro del constructor estaria llamandola instantaneamente desde ese archivo, y en tu punto de entrada estas inicializando el proyecto desde app.js no desde server.js