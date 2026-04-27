/* const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://magflo06275_db_user:GAPjAK2WRxNgHa1h@hotel-cluster.xw20l1n.mongodb.net/?appName=Hotel-Cluster";

const client = new MongoClient(uri);

async function connectDB()
{
  try
  {
    await client.connect();
    console.log("Connected to MongoDB");
  }
  catch (err)
  {
    console.error(err);
  }
}

module.exports = { client, connectDB }; */