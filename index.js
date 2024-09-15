const express = require('express') ;
const app = express() ;

const user = require('./routes/users') ;
const category = require('./routes/categories') ;
const product = require('./routes/products') ;
const favorite = require('./routes/favorites') ;
const order = require('./routes/orders') ;

app.use(express.json()) ;
app.use('/api/user', user) ;
app.use('/api/category', category) ;
app.use('/api/product', product) ;
app.use('/api/favorite', favorite) ;
app.use('/api/order', order) ;

app.listen(3000 , () => console.log('connected')) ;