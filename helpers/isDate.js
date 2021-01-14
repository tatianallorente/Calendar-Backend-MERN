const moment = require('moment');

// Creamos una validación personalizada para fechas, ya que express-validator no trae ninguna función de validación de fechas
const isDate = ( value, {req, location, path} ) => {

    if (!value) {
        return false;
    }

    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = {isDate};