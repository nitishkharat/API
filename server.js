var express = require('express');
const { request } = require('http');
var path = require('path');
var credentials = require("./data/credentials.json");
var flowers = require("./data/flowers.json");
var customers = require("./data/customers.json");
var app = express();


var orders = []
var payment = []
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//actions of http
//cross platform web API(GET, POST, PUT, DELETE)
//node js application 5 http handlers
//node js application 4 REST API handlers
app.get("/",function(req,res){
    res.sendFile("index.html");
});
//No.1 REST API handlers
app.get("/api/flowers",(req, res)=>{
    res.send(flowers);
});

//No.2 REST API handlers
app.get("/api/flowers/:id",(req, res)=>{
    let id = req.params.id;
    let flower = flowers.find(product=>product.id==id);
    res.send(flower);
});

//rest API
app.post("/api/flowers",(req, res)=>{
    let newFlower = req.body;
    flowers.push(newFlower);
    res.send("New flower added");
});


//rest API
app.put("/api/flowers/:id", (req, res) => {
    let id = req.params.id;
    let flower = flowers.find(product => product.id == id);

    if (!flower) {
        return res.status(404).send({ message: "Flower not found" });
    }

    // Update fields (example)
    flower.name = req.body.name ?? flower.name;
    flower.price = req.body.price ?? flower.price;
    flower.color = req.body.color ?? flower.color;

    res.send(flower);
});

//rest API
app.delete("/api/flowers/:id", (request, responce)=>{
    let id = request.params.id;
    let remainingFlowers = flowers.filter(f=>f.id!=id);
    flowers = remainingFlowers;
    responce.send("Flower deleted successfully");
});

//No.3 REST API handlers
app.get("/api/customers",(req, res)=>{
    res.send(customers);
});
//No.4 REST API handlers
app.get("/api/customers/:id",(req, res)=>{
    let id = req.params.id;
    let customer = customers.find(cust=>cust.id==id);
    res.send(customer);
});

//rest API
app.post("/api/customers",(req, res)=>{
    let newPerson = req.body;
    customers.push(newPerson);
    res.send("New Customer added");
});


//update data using button
app.put("/api/customers/:id",(req, res)=>{
    var existingCustomerId = req.params.id;
    var customerToBeUpadated = req.body;
    console.log("data to be updated at customers @server");
    console.log(customerToBeUpadated);
    res.send("customer data updated");
});


//delete data using button
app.delete("/api/customers/:id",(req, res)=>{
    var existingCustomerDelete = req.params.id;
    var customerToBeDeleted = req.body;
    console.log("data to be deleted at customers @server");
    console.log(customerToBeDeleted);
    res.send("customer data deleted");
});

//rest API
app.post("/api/login",(req, res)=>{
    console.log("Login is Invoked");
    var user = req.body;
    /*if(user.username == "ak" && user.password=="ak"){
        res.send("Valid User");
    }
    else{
        res.send("Invalid User");
    }*/
    let theUser = credentials.find(credential => credential.username == user.username && credential.password == user.password);
    let message = "Invalid User";
if(theUser !== undefined){
    message = "Valid User";
    res.send({ message });
}
else
    res.send(message);
});


//rest API
//http post handlers
app.post("/api/register", (req, res)=>{
    console.log("Post Registeration is invoked")
    var newCustomer = req.body;
    customers.push(newCustomer);
    res.send("Customer Registration is Successful")
});

app.listen(7498);
console.log("server listening on port 7498");