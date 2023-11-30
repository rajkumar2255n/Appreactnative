// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { MongoClient } = require('mongodb');

admin.initializeApp();

const app = express();

app.use(express.json());

app.post('/addData', async (req, res) => {
  try {
    const data = req.body.data;

    // Add your MongoDB connection string and database name
    const uri = 'YOUR_MONGODB_CONNECTION_STRING';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    const db = client.db('YOUR_DATABASE_NAME');
    const collection = db.collection('YOUR_COLLECTION_NAME');

    await collection.insertOne({ data });

    client.close();

    return res.status(200).json({ success: true, message: 'Data added to MongoDB' });
  } catch (error) {
    console.error('Error adding data to MongoDB:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

exports.api = functions.https.onRequest(app);
 
