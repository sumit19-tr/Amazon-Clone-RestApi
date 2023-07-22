let express = require('express');
let app = express();
let port = 9041;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let mongoUrl = "mongodb+srv://test:XKuhQ4x3x1CvkUag@cluster0.mwoz2jr.mongodb.net/?retryWrites=true&w=majority";
let db;
let cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hii from express');
})


//get all categories
app.get('/catagory', (req, res) => {
    db.collection('catagory').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//categories wrt id 
app.get('/catagory/:id', (req, res) => {
    let id = Number(req.params.id)
    db.collection('catagory').find({ "id": id }).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//get all products
app.get('/product', (req, res) => {
    db.collection('AllProduct').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//get products wrt category_id
app.get('/products/:category_id',(req,res) => {
    let category_id = Number(req.params.category_id);
    db.collection('AllProduct').find({'category_id':category_id}).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//get products wrt product_Id
app.get('/product/:id', (req, res) => {
    let product_id = Number(req.params.id);
    db.collection('AllProduct').find({ 'id': product_id }).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//get multiple product wrt array of productId
app.get('/products', (req,res) => {
    let product_ids = req.query.product_ids;

    //split the comma seperated string to array

    const product_idsArray = product_ids.split(',').map(id => parseInt(id.trim()));

    db.collection('AllProduct').find({'productId':{$in:product_idsArray}}).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})




app.get('/details/:id', (req, res) => {
    let product_id = Number(req.params.id);
    db.collection('AllProduct').find({ 'id': product_id }).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//get all mobiles
app.get('/mobiles', (req, res) => {
    db.collection('mobiles').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

//get mobiles wrt Id
app.get('/mobiless/:id', (req, res) => {
    let mobileId = Number(req.params.id);

    db.collection('mobiles').find({ 'id': mobileId }).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    })
})


//get mobiles wrt to brand name or catagory_id
app.get('/mobiless', (req, res) => {
    let brandId = Number(req.query.brandId);
    let catagory_id = Number(req.query.catagory_id);
    let query = {};

    if (brandId) {
        query = { "brand.brand_id": brandId }
    }
    else if (catagory_id) {
        query = { "category_id": catagory_id }
    }
    else {
        query = {};
    }
    db.collection('mobiles').find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    })

})

//get brand name wrt category_id
// app.get('/filter/:category_id',(req,res)=> {

// })

//Listing page filter
app.get('/filter/:category_id', (req, res) => {
    let category_id = Number(req.params.category_id);
    let brand_id = Number(req.query.brand_id);
    let lprice = Number(req.query.lprice)
    let hprice = Number(req.query.hprice)
    let H_discount = Number(req.query.H_discount)
    let L_discount = Number(req.query.L_discount)
    let h_Rating = Number(req.query.h_Rating)
    let l_Rating = Number(req.query.l_Rating)

    let query = {}

    if (brand_id) {
        query = {
            "category_id": category_id,
            "brand.brand_id": brand_id
        }
    }
    else if (h_Rating && l_Rating) {
        query = {
            "category_id": category_id,
            "$and": [{ Rating: { $gt: l_Rating, $lt: h_Rating } }]
        }
    }
    else if (hprice && lprice) {
        query = {
            "category_id": category_id,
            "$and": [{ Price: { $gt: lprice, $lt: hprice } }]
        }
    }
    else if (H_discount && L_discount) {
        query = {
            "category_id": category_id,
            "$and": [{ discount: { $gt: L_discount, $lt: H_discount } }]
        }
    }
    else {
        query = {
            "category_id": category_id
        }
    }

    // db.collection("AllProduct").find(query).sort({Price:1}).toArray((err,data) => {
    //     if(err) throw err;
    //     res.send(data)
    // })
    db.collection("AllProduct").find(query).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })

})

// order details 
app.get('/order/:id', (req, res) => {
    let product_id = Number(req.params.id);
    db.collection('AllProduct').find({ 'id': product_id }).toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.post('/addtocart', (req, res) => {
    db.collection('cart').insertOne(req.body, (err, result) => {
        if (err) throw err;
        res.send("data added")
        console.log(req.body);
    })
})

//cart items
app.post('/cartitems',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('AllProduct').find({id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result);
        })
    }
    else{
        res.send('invalid input');
    }
})

//placeOrder
app.post('/placeOrder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err
        res.json('order placed');
    })
})

//view orders
app.get('/viewOrders',(req,res)=>{
    db.collection('orders').find().toArray((err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//update orders
app.put('/updateOrder/:id',(req,res)=>{
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,data)=>{
            if(err) throw err
            res.send("Order Updated successfully");
        }
    )
})

app.get('/homepage/:section',(req,res) => {
        const section = req.params.section;
        db.collection('homepage').find({section}).toArray((err,data)=>{
            if (err) throw err;
            res.send(data)
        });
})

// connection with db
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log('Error while connecting');
    db = client.db("Amazon_clone");
    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server is Running on port ${port}`);
    })
})