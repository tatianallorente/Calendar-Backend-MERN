const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');  
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la bbdd');  
    }

}

module.exports = {
    dbConnection
}

/*
mern_user
0JQrZYN48BVi69A7
mongodb+srv://mern_user:0JQrZYN48BVi69A7@cluster0.www53.mongodb.net
*/