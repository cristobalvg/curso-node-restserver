// Entonces estas son las rutas relacionadas a los usuarios. Además este routes sólo deberían de tener las rutas y también la protección de las rutas. Pero todo su controlador, TODO que es la función router.get post etc, esa función debería estar en un archivo independiente para controlar dicha función.

import express from 'express';
import { usuariosDelete,
         usuariosGet,
         usuariosPatch,
         usuariosPost,
         usuariosPut } from '../controllers/usuarios.controllers.js';
const { Router } = express; //<= const router nos va a permitir llamar a la función que viene de Router();

// guardamos dentro de la constante router la función Router();
const router = Router(); //<= Este router, es al cual yo le voy a configurar las rutas.

// Esta ruta '7' ya no funciona por el static del método middleware que acabamos de crear. Por lo cual Si nosotros quisiéramos ver algo, podríamos poner aquí otro path, que es lo que vamos a hacer. Ya que siempre la carpeta public con el static tendrán pioridad y si hay otra ruta igual que la que esta en el static, fuera del folder public, esa ruta ya no funcionará a menos que cambiemos la ruta(path).

// entonces, básicamente así de fácil podemos crear utilizando express nuestro rest API.

// El método GET  solicita una representación de un recurso específico. Las peticiones que usan el método GET sólo deben recuperar datos.

// Obviamente yo no tengo el this.app.get, no existe, pero si existe el router.get perfectamente. Esto es exactamente lo mismo que el this.app.get, pero está en su archivo independiente
router.get('/', usuariosGet ); // <= Cuando se llame a router.get, entonces la request y response, esos dos argumentos van a ser pasados aquí = usuarioGet
//<= No estamos ejecutando la función usuariosGet(), solo estamos mandando la referencia a la misma = usuariosGet.

// método post, usualmente se utiliza para enviar una entidad a un recurso en específico, causando a menudo un cambio en el estado o efectos secundarios en el servidor.
router.post('/', usuariosPost);

// petición put, usualmente se utiliza para actualizar datos, reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición.
// Tenemos que obtener el valor de los parametros de segmento que nos envién por la url de alguna manera y para poder obtener este valor haciéndolo de manera dinámica, vamos a hacer lo siguiente: ('/: <= seguido del nombre que le queremos dar)
// router.put('/:id', usuariosPut ); // y este id, ahora ya viene configurado en el express y express, ya inclusive lo parsea y te lo da en una variable o mejor dicho una propiedad del objeto request = const { id } = req.params.

// Si quisieramos hacer del parámetro id opcional, solo tendríamos que agregar ? al final de id:
router.put('/:id?', usuariosPut );

// petición post, usualmente se utiliza para crear nuevos recursos. Se utiliza para enviar una entidad a un recurso en específico, causando a menudo un cambio en el estado o efectos secundarios en el servidor.
router.patch('/', usuariosPatch );

// petición delete, usualmente se utiliza obviamente para borrar algo, pero no necesariamente ustedes físicamente lo borran de la base de datos, simplemente podrían marcar ese registro como eliminado mediante alguna bandera y mandarle a decir al usuario que el registro se eliminó. 
router.delete('/', usuariosDelete );
// Fernando — Instructor 5 years ago, Lo que quiero decir, es que ya no es común que se borren datos de una base de datos, usualmente sólo se marcan como eliminados en el mismo registro... esto para no perder la relación referencial o que el contenido puede ser de utilidad para nosotros todavía.



export { router }