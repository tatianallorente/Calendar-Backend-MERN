/*
    Rutas del CRUD de eventos
    hostname + api/events
    Ejemplo: http://localhost:4000/api/events
*/

const {Router} = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

// Como vamos a usar el middleware "validarJWT" en todas las rutas, podemos definirlo así:
router.use(validarJWT);
// En vez de tener que ponerlo en cada uno:
// router.get('/', validarJWT, getEventos);


// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/', 
    [ //middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        // Creamos una validación personalizada para fechas
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualizar un evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;