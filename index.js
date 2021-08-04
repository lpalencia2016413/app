const mongoose =  require("mongoose")
const app = require("./app")
var usuarioControlador = require("./src/controladores/usuarios.controlador");

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://administrador:cbf7d8dddb@eathly.3ji8c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Se encuentra conectado a la base de datos');
    app.listen(process.env.Port || 3000, function () {
        console.log("Servidor corriendo en el puerto 3000");
        usuarioControlador.admin();
    })
}).catch(err => console.log(err))
