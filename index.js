const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mahin:mahin08@cluster0.6u8iq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


client.connect(err => {
  const customerOrder = client.db("creative-agency").collection("order");
  const customerReview = client.db("creative-agency").collection("review");
  const addService = client.db("creative-agency").collection("services");
  const admin = client.db("creative-agency").collection("makeAdmin");
  app.post('/addOrder',(req,res)=>{
    const order = req.body;
    customerOrder.insertOne(order)
    .then(result => res.send(result.acknowledged))
  })


  app.post('/addReview',(req,res)=>{
    const review = req.body;
    customerReview.insertOne(review)
    .then(result => res.send(result.acknowledged))
  })


  app.get('/getFeedback',(req,res)=>{
    customerReview.find({})
    .toArray((err,data)=>{
        res.send(data)
    })
  })


  app.get('/getOrder',(req,res)=>{
    customerOrder.find({})
    .toArray((err,data)=>{
        res.send(data)
    })
  })


  app.patch('/updateOrder/:id',(req,res)=>{
    const order = req.body;
    const {name,email,course,details,price,image,response} = order;
    customerOrder.updateOne(
        {_id:ObjectId(req.params.id)},
        {$set:{
            name:name,
            email:email,
            course:course,
            details:details,
            price:price,
            image:image,
            response:response
        }}
    )
    .then(result => res.send(result.acknowledged))
  })
  

  app.post('/addService',(req,res) =>{
    const service = req.body;
    addService.insertOne(service)
    .then(result => res.send(result.acknowledged))
  })


  app.get('/getService',(req,res)=>{
    addService.find({})
    .toArray((err,data)=>{
      res.send(data)
    })
  })


app.post('/addAdmin',(req,res)=>{
  const makeAdmin =req.body;
  admin.insertOne(makeAdmin)
  .then(result => res.send(result.acknowledged))
})


app.get('/getAdmin',(req,res) => {
  admin.find({})
  .toArray((err,data) => {
    res.send(data)
  })
})

});

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(5000,()=>console.log("Running this Port"))