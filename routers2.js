const express = require('express');
const routers = express.Router();
const multer = require('multer');
require('./connection.js')
const Product = require('./Product')

routers.get('/products', async (req, res) =>{

    try {
        
        const products = await Product.find()
        if (products.length > 0) {

            res.send({
                status:'success',
                message: 'list products',
                data : products
            })
            
        } else {
            res.send({
                status:'success',
                message: 'list products tidak ditemukan',
            
            })
        }

    } catch (error) {
        
        res.send({
            status : 'error',
            message : 'Error karna '+ error.message});
    }
  
});

routers.get('/product/:id', async (req, res) =>{

    try {

        const product = await Product.findById(req.params.id)

        if (product) {

            res.send({
                status : 'success',
                message : 'single product',
                data : product
            });
            
        } else {
            
            res.send({
                status : 'error',
                message : 'single product not found',
              
            });
        }
        
    } catch (error) {
        

        res.send({
            status : 'error',
            message : 'Error karna '+ error.message});
    }
  
});

routers.post('/product',multer().none(), async (req, res) =>{

    try {
        const {name, price, stock, status} = req.body
            const product = await Product.create({
                name : name,
                price : price,
                stock : stock,
                status : status
            })

            if (product) {
                
                res.send({
                    status : 'success',
                    message : 'Tambah product success',
                    data : product
                })

            } else {
                
                res.send({
                    status : 'warning',
                    message : 'Tambah product gagal'
                })
            }
           
        } catch (error) {
    
            res.send({
                status : 'error',
                message : 'koneksi database gagal karena '+ error.message,
            
            });    
  
        }

});

routers.put('/product/:id', multer().none(), async (req, res) =>{
    const {name , price, stock, status} = req.body
       
    try {

        const result = await Product.updateOne(
            {_id:req.params.id},
            {
                name : name,
                price : price,
                stock : stock,
                status : status
            },
            { runValidators : true}
        )

        if (result.ok == 1) {
            
            res.send({
                status : 'success',
                message : "Update produk success",
                data : result
            })

        } else {
            
            res.send({
                status : 'warning',
                message : "Update produk failed ",
                data : result
            })
        }
        
    } catch (error) {
      
        res.send({
            status : 'error',
            message : 'Eror data karena '+ error.message,
          
        });
    }

});


routers.delete('/product/:id', async (req, res) =>{

    try {
       
        const result = await Product.deleteOne({_id : req.params.id})
        if (result.deletedCount == 1) {
        
            res.send({ 
                status : 'success',
                message :'Delete produk success',
                data : result
             })
        } else {
            
            res.send({ 
                status : 'warning',
                message :'Delete produk failed',
                data : result
            })
        }

    } catch (error) {
      
        res.send({
            status : 'error',
            message : 'Error karena '+error.message,
          
        });
    }

});

module.exports = routers;