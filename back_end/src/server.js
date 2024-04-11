import express from 'express';

// Create an Express application
const app = express();

app.listen(4000, () => {
    console.log("The server is now running on port 4000")
})