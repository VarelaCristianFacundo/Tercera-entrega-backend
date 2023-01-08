const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv").config();

const app = express();

//Logs
const logs = require("./src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

const PORT = process.env.PORT || 8080;

//Sesiones
app.use(session({
  cookie: { maxAge: 600000 },
  secret:"dalerojo",
  resave:false,
  saveUninitialized:false,
  rolling:true
}))
 
//Midelware
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'))
app.use(express.json()); // body-parser
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//Guardado todas las peticiones
app.use((req, res, next) => {
  loggerConsola.info(`ruta ${req.originalUrl} metodo ${req.method}`);
  next();
});

 //ROUTES
const produtosRoute = require("./routes/productos");
app.use("/api/productos", produtosRoute);

const carritoRoute = require("./routes/carrito");
app.use("/api/carrito", carritoRoute);
const register = require("./routes/register");
app.use("/register", register);

const login = require("./routes/login");
app.use("/login", login);

const logout = require("./routes/logout");
app.use("/logout", logout);

const ordenes = require("./routes/ordenes");
app.use("/api/ordenes", ordenes)

app.use((req, res, next) => {
  res.status(404);
  res.send({error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`});
});

//HTTP
const http = require("http");
const server = http.createServer(app);

//SOCKET
const { Server } = require("socket.io");
const { logger } = require("./src/nodemailer-twilio/nodemailerConfig");
const io = new Server(server);

io.on("connection", (socket)=> {
  socket.emit("render", "")
  socket.on("actualizacion", ()=>{
    io.sockets.emit("render", "")
  })
})

//SERVER
server.listen(PORT, () => {
    loggerConsola.info(`Server ok en puerto ${server.address().port}`)
  })
server.on('error', error => loggerError.error(`Error en servidor ${error}`))
