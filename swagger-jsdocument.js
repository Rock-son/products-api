"zse strict";

module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node API",
      version: "1.0.0",
      description: "Product API project"
    }
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
