const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv").config();
const ENV = require("./src/configs/enviromentConfig");
const middlewares = require("./src/middlewares/middlewares");

//LOGS
const logs = require("./src/logs/loggers");
const loggerConsola = logs.getLogger("consola");
const loggerError = logs.getLogger("error");

//APP
const app = express();
const PORT = process.env.PORT || ENV.port;

//MIDLEWARES
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.json({ extended: true })); // body-parser
app.use(express.urlencoded());

//SESSIONS
app.use(
  session({
    cookie: { maxAge: ENV.session_time },
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    rolling: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
const productos = require("./src/routes/productos");
const carrito = require("./src/routes/carrito");
const ordenes = require("./src/routes/ordenes");
const chats = require("./src/routes/chat");
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);
app.use("/api/ordenes", ordenes);
app.use("/api/chat", chats);

const register = require("./src/routes/register");
const login = require("./src/routes/login");
const logout = require("./src/routes/logout");
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
 
app.use("/", middlewares.isRegister, (req, res) => {
  res.status(301).redirect("/productos.html");
});
 
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
  });
});

//HTTP
const http = require("http");
const server = http.createServer(app);


//SOCKET
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("render", "");
  socket.emit("renderchat", "");
  socket.on("actualizacion", () => {
    socket.emit("render", "");
  });
  socket.on("chat", () => {
    io.sockets.emit("renderchat", "");
  });
});

//SERVER
server.listen(PORT, () => {
  loggerConsola.info(`Server is run on port ${server.address().port}`);
});
server.on("error", (error) => loggerError.error(`Error en servidor ${error}`));
