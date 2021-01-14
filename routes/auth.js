/*
    Rutas de usuarios / Auth
    hostname + api/auth
    Ejemplo: http://localhost:4000/api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


// ValidarCampos
// Si usáramos los check sin el middleware ValidarCampos, simplemente tendríamos un objeto con los errores, pero el código seguiría ejecutándose.


// POST http://localhost:4000/api/auth/
router.post('/',     
    [ //middlewares
        check('email', 'El email es incorrecto').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario
);



// POST http://localhost:4000/api/auth/new 
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario
);


// GET http://localhost:4000/api/auth/renew 
router.get('/renew', validarJWT, renovarToken);




// En node no podemos poner export, ponemos:
module.exports = router;



// --- NOTAS ---

// Código mínimo necesario (sin validaciones)
// router.post('/new', crearUsuario);


// Para no escribir toda la lógica aquí y que sea muy complejo, creamos los controllers
/*
router.post('/renew', (req,res) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
});
*/