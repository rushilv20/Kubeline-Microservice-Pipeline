import express from 'express';
import rootRoutes from './routes/root.js';

const app = express();

app.use(express.json());

//My Routes
app.use('/', rootRoutes);


const port = 7001;

//Starting a server
app.listen(port, () => {
  console.log(`data-calc-microservice listening at ${port}`);
});
