const server = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const CustomersModel = require("./customersModel/CustomersModel");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended:true
}));

server.get('/ConsoleApiGet', async (req, res)=>{
    
    const param = req.query;
    if (param.call == "ListAllCurtomers"){
        console.log("ListAllCurtomers");
        customersModel = new CustomersModel();
        res.send(await customersModel.listAllCustomers());
    }

})

server.post('/ConsoleApiPost', async (req, res)=>{
    
    console.log(req.body.params);
    console.log(req.body);

    if (req.body.params.call == "InsertCustomer"){
        customersModel = new CustomersModel();
        
        res.send(
                    await customersModel.insertData(req.body.customer)
                );
    }

})

server.put('/ConsoleApiPut', async (req, res)=>{
    
    console.log(req.body.params);
    console.log(req.body);

    if (req.body.params.call == "UpdateCustomer"){
        customersModel = new CustomersModel();
        
        res.send(
                    await customersModel.updateData(req.body.customer)
                );
    }

})

server.listen(5000, (req, res) => {
    console.log("Server has started in port 5000!");
})
