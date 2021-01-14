const {response} = require('express');
const {validationResult} = require('express-validator');


// validarCampos hace que entre en cada check (routes/auth.js), y si todo va bien sigue con el siguiente, así hasta llegar al controlador. Si algún check falla, no continúa.
const validarCampos = (req, res = response, next) => {

    // Manejo de errores, validación
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}


module.exports = {
    validarCampos
}