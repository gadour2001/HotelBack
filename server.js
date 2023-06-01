const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const userRoute = require('./Routers/User.Route');
const clientRoute = require('./Routers/Client.Route');
const materialProductRoute = require('./Routers/materialProduct.Route');
const commandeRoute = require('./Routers/Commande.Route');
const serviceRoute = require('./Routers/Service.Route');
const ligneCommandeRoute = require('./Routers/ligneCommande.Route');
const ligneReservationRoute = require('./Routers/ligneCommande.Route');
const categoryRoute = require('./Routers/Category.Route');
const responsableServiceRoute = require('./Routers/responsableService .Router');
const responsableclientRoute = require('./Routers/ResponsableClient.Route');
const adminRoute = require('./Routers/Admin.Route');
const productRoute = require('./Routers/Product.Route');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app)
const io = new Server(server , {
    cors: {
        origin:'http://localhost:3000',
        methods: ["GET" , "POST" , "PUT" , "DELETE"],
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("add_Order", () => {
      socket.broadcast.emit("add_Order")
    })
    socket.on("Edit_Order", () => {
      socket.broadcast.emit("Edit_Order")
    })
    socket.on("add_Custom", () => {
      socket.broadcast.emit("add_Custom")
    })
    socket.on("valid_Custom", () => {
      socket.broadcast.emit("valide_Custom") 
    })

});


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    res.setHeader('Access-Control-Allow-Headers','"Origin, X-Requested-With, Content-Type, Accept"')
    next()
});


app.use('/user', userRoute)
app.use('/client', clientRoute)
app.use('/product', productRoute)
app.use('/materialProduct', materialProductRoute)
app.use('/commande', commandeRoute)
app.use('/service', serviceRoute)
app.use('/ligneCommande', ligneCommandeRoute)
app.use('/ligneReservation', ligneReservationRoute)
app.use('/category', categoryRoute)
app.use('/responsableService', responsableServiceRoute)
app.use('/responsableClient',responsableclientRoute)
app.use('/admin', adminRoute)


server.listen(5001,()=> console.log('server socket run !'))
app.listen(5000,()=> console.log('server axios run !'))




