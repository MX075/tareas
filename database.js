const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/news1', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log("base de datos error:", err))