import express from "express";
const { request ,response } = express;

const usuariosGet = (req = request, res = response) => { //<= Esta es una petición get, es uno de los endpoints de las peticiones http.

    // MUY IMPORTANTE, LEER LOS SIGUIENTE: Normalmente, cuando los parámetros se pasan por la ruta es porque queremos obtener la información desde la base de datos, es decir, un get, mandamos el id y obtenemos la información. En cambio cuando lo mandamos por body es porque ya estaríamos haciendo un post, put, patch, etc.

    // Por ejemplo, si estamos creando un usuario, no sería recomendable pasarlo por la ruta ya que la contraseña quedaría visible y no sería seguro y por eso lo mandamos por el body a través de un post.

    // Tambien van a existir la situaciones donde vamos a querer enviar query params, por ejemplo ?q=hola&nombre=cristobal&apikey=123 <= esto son los query params donde viene información en la url con las peticiones http. Además todo los arguementos con los signos de interrogación = ? en la url son considerado opcionales:
    const { q, nombre = 'No name', apikey, page = 101, limit } = req.query; // Hacer la destructuring, no sirve también para colocarle valores por defecto en las query params, ya que si no enviaran las query, podemos especificar recibir un valor por defecto si es que no llegaran a enviar cierta query y al final si recibir un valor. Entonces, de esta manera le podemos dar esta flexibilidad a nuestros parámetros gracias a la desestructuración.

    res.json({ //<= res.status(403).json <= aquí da como respuesta es este endpoint, en postamn, un 403 Forbidden. Esto significa que se hizo un llamado ilegal a mí endpoint, porque el servidor rechazó por alguna razón y retornó un 401. Usualmente el 401 está relacionado a una petición no autorizada. Puede ser que haga falta algún token ahí nosotros sabremos que fue. Pero est nosotros lo vamos a utilizar cuando realmente la persona no está autenticada para acceder a este endpoint.
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit,
    });

    // Si, tiene razón. .send() puede retornar un json sin problema, esto definirá el encabezado Content-Type en “text/json”, pero que pasara si envías HTML por ejemplo? 

    // res.send('<p>some html</p>')
    // La definición seria Content-Type to “text/html”, esto podría confundir en gran manera al desarrollador que intente interactuar con tu API rest, servicio web, u otro.

    // Al usar res.json() el Content-Type  sera de tipo JSON y cualquier valor que se intente enviar a través de res.json( ) se intentara convertir en un JSON.

    // Por lo general, se intenta establecer un tipo de dato único para que ambas partes (backend-Frontend) puedan entenderse y evitar errores.
}


const usuariosPost = (req, res = response) => { // hacer el res = response valor por default es solo para que vscode lo visualice, pero no es necesario escribir en los parámetros, res = response para que funcione la petición post, ni ninguna petición, ni request, ni response. La desestructuración que hizo del response = import express from "express"; y const { response } = express; es sólo para que el Visual Studio Code pueda autocompletar cuando escribas 'res.' dentro la función ya que está dándole el valor por default de response, pero no es necesario para que funcione.

    // Extraemos el body de la petición POST:
    const { nombre, edad } = req.body; // <= Entonces de esta manera, pues ignoro cualquier cosa que me esté mandando el usuario que no sea lo que yo realmente estoy esperando, que en este caso estoy esperando las propiedades nombre y edad. Por lo cual esto es una pequeña validación.

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad,
    });
};

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id,
    });
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador',
    });
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador',
    });
};

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}