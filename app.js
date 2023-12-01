const register = require('./controllers/authController.js')
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const mongoose = require('mongoose');

// multerStorage -> destination, fileName
const multerStorage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "public/assets")
    },
    filename : function(req, file, cb){
        cb(null, `user-${Date.now()}.jpeg`)
    }
})

// filter - file type validation
const filter = function(req, file, cb){
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }
    else{
        cb(new Error("Invalid file type. Please upload an image"), false)
    }
}

/* Configurations */
app.use(express.json());

// multer -> storage, fileFilter, limits
const upload = multer({
    storage : multerStorage,
    fileFilter: filter,
    limits: {
        fileSize : 1024 * 1024 * 5 // 5MB limit
    }
})

/* Mongoose setup */
const PORT = process.env.PORT | 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    app.listen(PORT, function(){
        console.log(`Server is running at port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})

/* Routes */
app.use('/auth/register', upload.single("picture"), register);

