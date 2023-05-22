const express = require('express');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = 8000; // You can change the port number if desired

// Other middleware and configuration
// ...
app.use(express.json());

// Define your API routes
app.use('/api/contacts', contactsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
