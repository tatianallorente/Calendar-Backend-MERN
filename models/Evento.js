const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },    
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

// Mongoose por defecto usa el serializador toJSON y podemos sobreescribirlo
/*
// (Ver esto más claramente desde postman)
{
    "ok": true,
    "evento": {
        "_id": "5ffcb33ddbdd4c190cfcaf4f",
        "title": "cumple",
        "start": "1970-01-01T00:00:00.001Z",
        "end": "1970-01-01T02:46:40.000Z",
        "notes": "comprar tarta",
        "user": "5ffcaa670578810cf0798e23",
        "__v": 0
    }
}
*/
// Así, podemos eliminar el campo __v que no necesitamos y modificar el campo que crea _id por simplemente id
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Evento', EventoSchema);