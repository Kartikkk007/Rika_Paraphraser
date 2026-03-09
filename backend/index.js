import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import paraphraseRoutes from './routes/paraphraseRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  API ROUTES 

app.use("/api", paraphraseRoutes);

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//  SPA ROUTING 
// This catches everything else and sends it to the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});