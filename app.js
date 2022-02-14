let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://user:root@cluster0.fsqmx.mongodb.net/edu-liquor-project-api?retryWrites=true&w=majority"
const dotenv = require('dotenv');
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
let port = process.env.PORT || 8210;
var db;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('welcome to my express app')
})

//city
app.get('/city/:id',(req,res)=>{
    let restId=Number(req.params.id)
    db.collection('city').find({city_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// show category

app.get('/categories',(req,res)=>{
    // let restId=Number(req.params.category_id)
    db.collection('data').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// category by choice
app.get('/category/:id',(req,res)=>{
    let restId=Number(req.params.id)
    db.collection('liquor').find({category_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('filter/:categoryId',(req,res)=>{
    let sort={cost:1}
    let categoryId=Number(req.params.categoryId);
    let skip=0;
    let limit=1000000;
    let lcost=Number(req.query.lcost)
    let hcost=Number(req.query.hcost)
    let query={};

    if(req.query.sort){
        sort={cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip=Number(req.query.limit)
    }
    if(lcost && hcost){
        query={
            $and:[{cost:{$gt:lcost, $lt:hcost}}],
	"category_id":categoryId
        }
    }
    db.collection('liquor').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//product details
app.get('/details/:id',(req,res)=>{
    let restId=Number(req.params.id)
    db.collection('liquor').find({product_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

console.log('hello world');

MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log("Error While Connecting")
    db = client.db('edu-liquor-project-api');
    app.listen(port, () => {
        console.log(`listening on port no ${port}`)
    })
})
