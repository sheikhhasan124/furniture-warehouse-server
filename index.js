const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hjxrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try {
  await client.connect()
 const furnitureCollections = client.db('furniture').collection('products')
 const furnitureGallay = client.db('furniture').collection('gallary')
 const furnituQuantity = client.db('furniture').collection('quantity')



 // get all img from gallary
 app.get('/gallary',async(req,res)=>{
   const query = {}
   const cursor = furnitureGallay.find(query);
   const imges = await cursor.toArray()
   res.send(imges)
 })
// post api
app.post('/product',async(req,res)=>{
   const newProduct = req.body;
   const product = await furnitureCollections.insertOne(newProduct)
   res.send(product)
})
// get all products api
app.get('/product',async(req,res)=>{
  const query = {}
  const cursor = furnitureCollections.find(query);
  const products = await cursor.toArray()
  // res.send('ok')
  res.send(products)
})
// UPDATE PRODUCT
app.put('/product/:id',async(req,res)=>{
  const id = req.params.id;
  const updateQuantity = req.body;
  const filter = {_id:ObjectId(id)}
  const option = {upsert:true}
  const updateDoc = {
    $set:{
      quantity:updateQuantity.quantity
    }
  }
  const result = await furnitureCollections.updateOne(filter, updateDoc, option);
  res.send(result)
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
    res.send('welcome to home')
})

app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})
