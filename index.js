const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://furnitureWarehouse:0YlFGborr8mxojzG@cluster0.hjxrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('connect db')
  // perform actions on the collection object
  client.close();
});


app.get('/',(req,res)=>{
    res.send('home')
})

app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})
