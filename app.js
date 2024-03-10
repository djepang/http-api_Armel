// app.js
const express = require('express');
const app = express();
const port = 3000;

// Log-Level aus der Umgebungsvariable lesen oder auf INFO setzen, wenn nicht angegeben
const logLevel = process.env.LOG_LEVEL || 'INFO';

// Funktionen für verschiedene Log-Level definieren
const logFunctions = {
  INFO: console.info,
  DEBUG: console.debug,
  ERROR: console.error,
  FATAL: console.error, // FATAL wird genauso behandelt wie ERROR
};

// Middleware für Log-Nachrichten
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Routen-Handler für /info, /debug, /error, /fatal
app.get('/info', (req, res) => {
  logFunctions.INFO(`${new Date().toISOString()} info: This is an info message`);
  res.send('Info message logged');
});

app.get('/debug', (req, res) => {
  logFunctions.DEBUG(`${new Date().toISOString()} debug: This is a debug message`);
  res.send('Debug message logged');
});

app.get('/error', (req, res) => {
  logFunctions.ERROR(`${new Date().toISOString()} error: This is an error message`);
  res.send('Error message logged');
});

app.get('/fatal', (req, res) => {
  logFunctions.FATAL(`${new Date().toISOString()} fatal: This is a fatal message`);
  res.send('Fatal message logged');
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
