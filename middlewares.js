const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require("./swagger");
const authMiddleware = require("./auth/auth.middleware")

const setupMiddlewares = (app) => {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    app.use(bodyParser.json());
    authMiddleware.init()
    app.use(authMiddleware.protectWithJwt)
}

exports.setupMiddlewares = setupMiddlewares
