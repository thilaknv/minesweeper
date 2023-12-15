import express from "express";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(port, (req, res) => {
    console.log('listening to server');
})