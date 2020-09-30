const MongoClient = require('mongodb').MongoClient;
//tanpa authenticaion
// const connectionString = "mongodb://localhost:27017";
const connectionString = "mongodb://user_latihan:123456@localhost:27017/?authSource=admin";

//Default
// MongoClient.connect(connectionString, {useUnifiedTopology :true}, (error, client)=>{
//     if (error) {
//         return console.error(error);
        
//     }
//     console.log("Server database connect ");
    
// });

// Promise
// MongoClient.connect(connectionString, {useUnifiedTopology:true})
// .then(client => {
//     console.log(client.s.url);
    
//     console.log('Database berhasil connect');
    
// })
// .catch(error => console.error(error))

//Async Aawit
(async () => {
    try {
     const client = await MongoClient.connect(connectionString,{useUnifiedTopology:true});
     const db = client.db('latihan');

     //kode query ke collections 
     const products = await db.collection('products').find({
         name : /ni/
     }).toArray();
     console.log(products);
     console.log(connectionString);
     
        
    } catch (error) {
        console.error(error);
        
    }
})();