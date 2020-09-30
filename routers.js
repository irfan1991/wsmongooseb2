const express = require('express');
const routers = express.Router();
const client = require('./connection');
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const id = req.params.id;
const _id = (ObjectId.isValid(id))?ObjectId(id):id

routers.get('/products', async (req, res) =>{

    if (client.isConnected()) {
        const db = client.db('latihan');
        const products = await db.collection('products').find().toArray()
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
        
    } else {
        res.send({
            status : 'error',
            message : 'Koneksi database gagal'});
        
    }
});

routers.get('/product/:id', async (req, res) =>{

    if (client.isConnected()) {
        const db = client.db('latihan');
        const product = await db.collection('products').findOne({_id:_id})

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
        

    } else {
        res.send({
            status : 'error',
            message : 'koneksi database gagal',
          
        });
        
    }
});

routers.post('/product',multer().none(), async (req, res) =>{

    if (client.isConnected()) {
        const {name, price, stock, status} = req.body
        const db = client.db('latihan');
        const result = await db.collection('products').insertOne({
            name : name,
            price : price,
            stock : stock,
            status : status
        })

        if (result.insertedCount == 1) {
            
            res.send({
                status : 'success',
                message : 'Tambah product success'
            })

        } else {
            
            res.send({
                status : 'warning',
                message : 'Tambah product gagal'
            })
        }

       
    } else {
        res.send({
            status : 'error',
            message : 'koneksi database gagal',
          
        });
        
    }
});

routers.put('/product/:id', async (req, res) =>{

    if (client.isConnected()) {
        const {name , price, stock, status} = req.body
        const db = client.db('latihan');
        const result = await db.collection('products').updateOne(
            {_id: ObjectId(req.params.id)},
            {
                $set:{
                    name : name,
                    price : price,
                    stock : stock,
                    status : status
                }
            }
        )

        if (result.matchedCount == 1) {
            
            res.send({
                status : 'success',
                message : "Update produk success"})

        } else {
            
            res.send({
                status : 'warning',
                message : "Update produk failed "})
        }
        
    } else {
        res.send({
            status : 'error',
            message : 'koneksi database gagal',
          
        });
    }
});


routers.delete('/product/:id', async (req, res) =>{

    if (client.isConnected()) {
        const db = client.db('latihan');
        const result = await db.collection('products').deleteOne({_id : ObjectId(req.params.id)})
        if (result.deletedCount == 1) {
        
            res.send({ 
                status : 'success',
                message :'Delete produk success' })
        } else {
            
            res.send({ 
                status : 'warning',
                message :'Delete produk failed' })
        }
        
    } else {
        res.send({
            status : 'error',
            message : 'koneksi database gagal',
          
        });
        
    }
});

module.exports = routers;