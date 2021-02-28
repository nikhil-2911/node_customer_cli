const mongoose = require("mongoose");

// Connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli', {
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true
});

// Import model
const Customer = require('./models/customer');

// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added');
    }).catch(err =>{
        console.info('Something went wrong');
    });
};

// Find Customer
const findCustomer = (name) => {
    // Make case insensitive
    // Bcz if db has JOHN and we find for john it show nothing so make it insensitive 
    // using RegExp constructor lowercase i
    const search = new RegExp(name , 'i');
    Customer.find({$or : [{firstname : search},{lastname : search}]})
        .then(customer => {
            if(customer.length != 0){
                console.info(customer);
                console.info(`${customer.length} matches`);
            }else{
                console.info('No user found!');
            }
        }).catch(err => {
            console.info('Something went wrong');
        });
};

// Update Customer
const updateCustomer = (_id , customer) => {
    Customer.findByIdAndUpdate({_id}, customer)
        .then(customer => {
            console.info('Customer Updated');
        }).catch(err =>{
            console.info('Something went wrong');
        });
};

// Remove Customer
const removeCustomer = (_id) => {
    Customer.findByIdAndDelete({_id})
        .then(customer => {
            console.info('Customer Removed');
        }).catch(err =>{
            console.info('Something went wrong');
        });
};

// List Customer
const listCustomer = () => {
    Customer.find()
        .then(customers => {
            console.info(customers);
            console.info(`${customers.length} matches`);
        }).catch(err => {
            console.info('Something went wrong');
        })
};


// Export All Methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}
