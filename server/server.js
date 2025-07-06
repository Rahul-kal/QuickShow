import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';

const app = express();
const port = 3000;

// Connect to DB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ CSP Headers (fixes Google Fonts + unsafe-eval issues)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;"
  );
  next();
});


// API Routes
//app.get('/', (req, res) => res.send('Server is Live!'));
app.get('/', (req, res) => {
  if (req.query.__clerk_handshake) {
    // Let Clerk handle the handshake
    res.status(200).send('Clerk handshake acknowledged');
  } else {
    res.send('Server is Live!');
  }
});

app.use('/api/inngest', serve({ client: inngest, functions }));

// Start server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
