
const http = require('http');
const express = require('express')
const fs = require('fs')
var path = require('path')

const hostname = '127.0.0.1';
const port = 3000;



const app = express()
app.use(express.static(path.join(__dirname, '/')));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/home', (req, res)=>{
    //console.log(req.query.ime)
    let osoba = {
        ime: req.query.ime,
        prezime: req.query.prezime,
        mobitel: req.query.brojMobitela
    }
    osobaString = JSON.stringify(osoba)
    //console.log(osobaString)
    //console.log("Dobar dan")
    if(osoba.ime === undefined){
        res.sendFile(__dirname + '/index.html');
        return;
    }
    fs.appendFile('podaci.json', osobaString, function (err) {
        if (err) throw err;
        console.log("Spremljeno");
      });
    res.sendFile(__dirname + '/index.html')
});

app.get('/home/podaci', (req, res)=>{
    //res.sendFile(__dirname + '/podaci.html')
    
    res.render('../podaci',{
        podaci: "Ispisani podaci",
    })
});

app.listen(3000, ()=>{
    console.log("Server radi \n\n")
});

