import express from 'express';
import applicantsRouter from './routes/applicants.js';
import slotsRouter from './routes/slots.js';
import bookingsRouter from './routes/bookings.js';

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use(applicantsRouter);
app.use(slotsRouter);
app.use(bookingsRouter);

export default app;
