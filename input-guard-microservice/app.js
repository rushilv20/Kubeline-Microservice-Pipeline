import express from 'express';
import rootRoutes from './routes/root.js';

const app = express();

app.use(express.json());

//My Routes
app.use('/', rootRoutes);

const port = 6000;

//Starting a server
app.listen(port, () => {
  console.log(`input-guard-microservice listening at ${port}`);
});
