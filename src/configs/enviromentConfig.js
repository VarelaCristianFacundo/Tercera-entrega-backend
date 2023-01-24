let port
let db
let session_time
let adminMail

const enviroment = process.env.NODE_ENV
switch (enviroment) {
    case 'development':
        port = 8080
        db = "mongodb://127.0.0.1:27017/ecommerce"
        session_time = 1000000
        adminMail = process.env.AVISO_EMAIL
        break
    case 'test':
        port = 8080
        db = "mongodb://127.0.0.1:27017/ecommerce_test"
        session_time = 1000000
        adminMail = process.env.AVISO_EMAIL
        break
    case 'production':
        port = 8081
        db = process.env.MONGO_CONEXION;
        session_time = 1000000
        adminMail = process.env.AVISO_EMAIL
        break
    default:
        port = 8080
        db = "mongodb://127.0.0.1:27017/ecommerce"
        session_time = 1000000
        adminMail = process.env.AVISO_EMAIL
        break
}

exports.port = port;
exports.dbString = db;
exports.session_time = session_time
exports.adminMail = adminMail

