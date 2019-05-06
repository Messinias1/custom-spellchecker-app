const express = require("express");
const data = require("./data.js");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;

const newwordRoutes = require('./routes/newwords');


app.use(bodyParser.json());
app.use('/newwords', newwordRoutes);

mongoose.connect("mongodb+srv://carlkakisis:" + process.env.MONGO_ATLAS_PW + "@spellchecker-mghur.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })

app.use(express.static('public'));

// console.log(data);

app.get("/data", function(req, res) { 
    const word = req.query.input;
    // const keys = Object.keys(data)
    if (data.hasOwnProperty(word) === true) {
        res.send(
            `<div>
                <h2 style="color:green">Look at That!!</h2>
                <p>The word --${word}-- is an English word!</p>
            </div>`);
    } else {
        res.send(
            `<div>
                <h2 style="color:red">I'm Sorry...</h2>
                <p>There appears to be no word --${word}-- in English.</p>
            </div>`)
    };
});

    

app.listen(port, () => console.log(`App listening on port ${port}`));
module.exports = app;