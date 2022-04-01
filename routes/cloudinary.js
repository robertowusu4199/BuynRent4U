const express = require("express")

const app = express()

const multer = require("multer")

const fileUpload = multer()

const cloudinary = require("cloudinary").v2

const streamifier = require('streamifier')

const router = express.Router()

const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



// app.post('/photos/upload', fileUpload.array('image', 5), function (req, res, next) {
//     console.log("Images ", req.file);  
// })


router.post('/upload', fileUpload.single('image'), function (req, res, next) {
  let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result)
                res.status(200)
                .json("successfully uploaded");
              } else {
                reject(error)
                res.status(400)
                .json("Something went wrong...");
              }
            }
          );
  
         streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  };
  
  async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
  }
  
  upload(req);
});


router.delete("/deleteimage", async (req, res, next) => {
  const {id} = req.body
  try {
    await cloudinary.uploader.destroy(id)
    res.status(202)
    .json("deleted");
  } catch (err) {
    console.log(err)
  }
})



module.exports = router








//router.get('/cloudinary', (req, res, next) => {
//  res.status(200).send('Hello Worldie!');
//})



//router.post('/cloudinary', (req, res) => res.json({ message: 'Hello World!' }))
