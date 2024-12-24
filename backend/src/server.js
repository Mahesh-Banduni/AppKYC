// server.js
const express = require('express');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blog.route.js');
const jobRoutes = require('./routes/job.opening.route.js');
const contactRoutes = require('./routes/contact.route.js');
const loginRoutes = require('./routes/user.route.js');
const connectDb = require('./configs/database.config.js');
const cors = require('cors');
const compression = require('compression');
const helmet=require('helmet');
const crypto=require('crypto');
const rendertron = require('rendertron-middleware');
const path = require("path");

connectDb();

dotenv.config();

const app = express();

// Use Rendertron middleware for rendering JavaScript content for bots (crawler).
app.use(rendertron.makeMiddleware({
  proxyUrl: 'http://localhost:3001/render',
  injectShadyDom: true,
  userAgentPattern: /Googlebot|Bingbot|Yahoo|Slurp|DuckDuckBot|Baiduspider/i
}));

// Middleware
//app.use(express.json());
// Serve static files from React frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Send React app for all other requests (Client-Side Rendering)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.use(compression());

app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.ORIGIN1],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Restrict methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to generate a CSP nonce
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString("base64"); // Use 32 bytes for better performance while retaining good randomness
  next();
});

// Configure Helmet with improved security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`], // Proper function-based nonce usage
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`], // Avoid 'unsafe-inline' when possible
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
        frameSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [], // Enables automatic upgrade to HTTPS
      },
    },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    strictTransportSecurity: {
      maxAge: 31536000, // One year in seconds
      includeSubDomains: true,
      preload: true,
    },
    xContentTypeOptions: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" }, // Correcting usage (consistent terminology)
    originAgentCluster: true,
  })
);

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth/login', loginRoutes);


  // Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
