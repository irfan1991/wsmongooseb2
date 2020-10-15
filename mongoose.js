const mongoose = require('mongoose');

//membuat koneksi 
mongoose.connect("mongodb://user_latihan:123456@localhost:27017/latihan?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology : true
})

//membuat schema untuk collection 
const productSchema = new mongoose.Schema({
    name : { 
        type :String, 
        required : [true, 'Field nama harus diisi'],
        minlength : 3,
        maxlength : 50
     },
    price : { 
        type :Number, 
        required : true,
        min : 10000,
        max: 100000000
    },
    // drink : {
    //     type : String,
    //     required : true ,
    //     enum : ['Kopi', 'susu', 'teh']
    // },
    stock : Number,
    status : {type: Boolean, default : true}
})

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        unique : true
    },
    email:{ 
        type : String,
        validate : {
            validator : function (v) {
                return /^\S+@\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email`
        },
    },
    password : String
})
const User = mongoose.model('User', userSchema)

// membuat model
const Product = mongoose.model('Product', productSchema);



const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', async ()=>{
    //console.log('Server database connect');
    // await Product.find().exec((err, result)=>{
    //     console.log(result);
        
    // })
    // const products = await Product.find()
    //  const products = await Product.find({
    //      status : true
    //  })
    //  console.log(products);

    //menampilkan single product 
    // const product = await Product.findOne({
    //     _id : '5f73f900cf25431423f83f7c'
    // })
    // const product = await Product.findById('5f73f900cf25431423f83f7c')
    // console.log(product);
    
    //menambah data baru
    // const newProduct = await Product.create({
    //     name : 'USB Converter',
    //     price : 50000,
    //     stock : 20,
    //     status : true
    // })
    // const newProduct = new Product()
    // newProduct.name = 'Meja'
    // newProduct.price = 200000
    // newProduct.stock = 10
    // newProduct.status = true
    // const insert = await newProduct.save()
    // console.log(insert);

    //mengupdate data
    // const update = await Product.updateOne(
    //     {_id:"5f74046e981d2d1761c40758"},
    //     {name : 'Meja Laptop'}
    // )
    // const updateProduct = await Product.findById('5f74046e981d2d1761c40758')
    // updateProduct.name = "Meja Komputer"
    // const update = await updateProduct.save()
    // console.log(update);

    //menghapus data
    // const deleteProduct = await Product.deleteOne( {_id:"5f74046e981d2d1761c40758"})
    // console.log(deleteProduct);
    
    //validasi
    // try {
    //     const newProduct = await Product.create({
    //         name : 'Co',
    //         price : 900,
    //         drink : 'Temulawak'
    //     })
    // console.log(newProduct);
    // } catch (error) {
    //     const error_name = error.errors['name'] && error.errors['name'].message
    //     if(error_name) console.log(error.message);
        
    // }
    
    //validasi user unique
    // try {

    //     const newUser = await User.create({
    //         username : 'John',
    //         email :'john.gmail.com',
    //         password : '123456'
    //     })
    //     console.log(newUser);
        
    // } catch (error) {
    //     console.log(error.message);
        
    // }
    
    //query builder
    const query = await  Product.find().select('name stock')
                        .where({'stock' : {$gte : 5}}).sort({stock:-1})
                        .limit(2).exec()
  
    console.log(query);
    
})