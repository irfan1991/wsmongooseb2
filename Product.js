const mongoose = require('mongoose')

///schema
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true, 'Field nama harus diisi'],
        minlength : 3,
        maxlength : 50
    },
    price :{
        type : Number,
        required : true,
        min: 1000,
        max: 10000000000
    },
    stock : Number,
    status: {type : Boolean, default: true},
})

//model
const Product = mongoose.model('Product', productSchema)
module.exports = Product