const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://Gyeongseo:gyeongseo123@remoview-shard-00-00.xmvyq.mongodb.net:27017,remoview-shard-00-01.xmvyq.mongodb.net:27017,remoview-shard-00-02.xmvyq.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-yv9mog-shard-0&authSource=admin&retryWrites=true&w=majority',
    {}).then(()=>{console.log('DB CONNECTED')})
                            .catch(err=>{console.log('===DB error=== ::: '+err)})
app.get('/',(req,res)=>{
    res.send('hello world!')
});


app.listen(5000);


