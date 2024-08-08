import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'A simple expense tracker API',
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;

