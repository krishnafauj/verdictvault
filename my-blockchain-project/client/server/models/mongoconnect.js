import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI
const dbName = 'panel';

let client;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db(dbName);
};

export default connectDB;
