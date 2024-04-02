const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Porao APP API with Swagger",
            version: "0.1.0",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Porao ",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: "http://localhost:8088/api/v1",
            },
        ],
    },
    apis: ["../routes/index/*.js"],
};
const specs = swaggerJsdoc(options);
module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(specs) };