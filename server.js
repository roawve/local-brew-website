// server.js (Updated - Added /about.html route)
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// --- MIDDLEWARE ---
// 1. Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 2. Parse JSON request bodies (MUST come before the route handler)
app.use(express.json());

// 3. Serve static files (HTML, CSS, JS) from the project root
app.use(express.static(path.join(__dirname)));
// Explicitly serve the js folder if needed by script tags
app.use('/js', express.static(path.join(__dirname, 'js')));


// --- ROUTES ---
// Serve index.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other html files explicitly
app.get('/menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'menu.html'));
});
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// --- ADD THIS ROUTE ---
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});
// --- END OF ADDED ROUTE ---


// API endpoint to handle contact form submission
app.post('/api/contact', (req, res) => {
    console.log('Received contact form submission:');
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        console.error('Missing form data');
        return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // TODO: Add email sending or database saving logic here

    res.status(200).json({ message: 'Message received successfully!' });
});


// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});