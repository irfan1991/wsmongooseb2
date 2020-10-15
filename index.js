// const compression = require('compression')
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


//static
app.use('/public',express.static(path.join(__dirname,'public')));

// menngunakan middleware body parser
app.use(bodyParser.urlencoded({extended:true}));
//parse JSON
app.use(bodyParser.json());

//cors middleware
var corsOptions = {
    origin : 'http://localhost:4000'
}
app.use(cors(corsOptions));

// middleware unuk cetak log
const log = (req, res, next) => {
    console.log(Date.now() + ' '+ req.ip + ' '+ req.originalUrl);
    next();
}
app.use(log);

// compress all responses


//middleware untuk routing
const routers = require('./routers2.js');
app.use(routers);

// app.use(compression())

//menangani gak ada halaman
const notFound = (req, res, next) => {
    res.json({
        status :'error',
        message :'halaman tidak ditemukan'
    })
};
app.use(notFound);

// menangani erro
const errorHandling =  (err, req, res, next) =>{
    console.error(err.stack);
    res.json({
        status : 'error',
        message : "terjadi kesalahan pada server"
    })

}
app.use(errorHandling)



app.listen(port , () => {
    console.log(`Server running at http://localhost:${port}`);
    
});