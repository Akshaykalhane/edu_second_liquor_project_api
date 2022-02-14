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
app.get('/city',(req,res)=>{
    db.collection('city').find().toArray((err,result)=>{
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
