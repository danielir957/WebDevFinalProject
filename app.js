import express from 'express';
import path from 'path';
import { createClient } from 'redis';
import tasksRouter from './routes/tasks.js';

// Get the directory name of the current module (this replaces __dirname in ES Modules)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Initialize Express app
const app = express();
const port = 3000;

// Create Redis client with cloud server configuration
const client = createClient({
  username: 'default',
  password: 'JU9ckfkaBpXUChTuTkc7YRGWsDJM1K7q', // Your Redis password
  socket: {
    host: 'redis-12491.c282.east-us-mz.azure.redns.redis-cloud.com',
    port: 12491
  }
});

// Handle Redis client errors
client.on('error', err => console.log('Redis Client Error', err));

// Connect to Redis
await client.connect();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Updated for ES modules

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use tasksRouter for handling tasks-related routes
app.use('/tasks', tasksRouter(client));

app.get('/', async (req, res) => {
  const tasks = await client.lRange('tasks', 0, -1); // Get tasks from Redis
  res.render('index', { tasks });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
