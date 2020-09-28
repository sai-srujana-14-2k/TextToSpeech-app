const express = require('express');
const Gtts = require('gtts.js').gTTS;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: true}));
app.set('view engine',"ejs");

app.get('/',(req,res) =>{
    res.render("index.ejs");
})

app.post('/',(req,res) => {
    var text = req.body.text;
    const speech = new Gtts(text,"en");
    speech.save("output.mp3").then(() => {
        res.download("output.mp3");
    }).catch((err) => {
        console.log("error");
    });
});

var port = process.env.PORT || 5000;

app.listen(port,() =>{
    console.log(`Listening to the port ${port}`);
})