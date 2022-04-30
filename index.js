const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://furnitureWarehouse:0YlFGborr8mxojzG@cluster0.hjxrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try {
  await client.connect()
 const furnitureCollections = client.db('furniture').collection('products')

// get all products api
app.get('/product',async(req,res)=>{
  const query = {}
  const cursor = furnitureCollections.find(query);
  const products = await cursor.toArray()
  // res.send('ok')
  res.send(products)
})
// get a product api
app.get('/product/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id: ObjectId(id)}
  const product = await furnitureCollections.findOne(query)
  res.send(product)
})
app.delete('/product/:id', async(req,res)=>{
  const id = req.params.id;
  const query = {_id: ObjectId(id)}
  const result = await furnitureCollections.deleteOne(query)
  res.send(result)
  // console.log(id)
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
