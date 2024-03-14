const express = require("express");
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
mongoose.connect("mongodb+srv://admin:admin@cluster0.gjilznz.mongodb.net/")

//schema data
const supportSchema={
    name:String,
    email:String,
    Message:String,

    pancard:Image,
    aadhar:Image,
    signature:Image,
    capture:CanvasCaptureMediaStreamTrack
}
const Support=mongoose.model("Support",supportSchema)


app.use(bodyParser.json()); 

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    let newNote=new Note({
        name:req.body.name,
        email:req.body.email,
        Message:req.body.message,
        pancard:red.body.pancard,
        aadhar:req.body.pancard,
        signature:req.body.signature,
        capture:req.body.capture
    });
    newNote.save();
    res.redirect('/');
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
