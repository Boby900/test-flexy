// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import authRoutes from "@/routes/auth"
import collectionRoutes from "@/routes/collection"
import metriceRoutes from './routes/metrice'

dotenv.config({ path: '.env' });
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use('/api/auth', authRoutes)
app.use('/api/collection', collectionRoutes)
app.use('/api/metrice', metriceRoutes)
// Set up routes

const server = createServer(app);

// Start the servers
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}, you better catch it!`);
});
export default app