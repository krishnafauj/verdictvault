import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../models/mongoconnect.js';
import router from '../routes/routes.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`.yellow.bold)
    );
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1); 
  });
app.use('/', router);

