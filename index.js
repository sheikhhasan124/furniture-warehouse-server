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
async function run(){
try {
  await client.connect()
 const furnitureCollections = client.db('furniture').collection('products')

// get products api
app.get('/products',async(req,res)=>{
  const query = {}
  const cursor = furnitureCollections.find(query);
  const products = await cursor.toArray()
  // res.send('ok')
  res.send(products)
})

} finally {
  // await client.close();
}
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('home')
})

app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})
