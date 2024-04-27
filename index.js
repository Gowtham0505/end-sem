const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');
const jwt_decode = require('jwt-decode');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const secretkey = "abcd";
const algorithm = "HS256";
const jwtmw = exjwt({
    secret: secretkey,
    algorithms: [algorithm]
});

// Replace this URL with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://admin:admin@cluster0.cjqwipx.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
        const db = client.db('s21');
        const col = db.collection('register');

        app.get('/home', (req, res) => {
            res.send("Welcome to the online donation management system");
        });

        app.post('/insert', async (req, res) => {
            console.log(req.body);
            req.body.password = await bcrypt.hash(req.body.password, 5);
            col.insertOne(req.body);
            res.send("Data received and inserted into the database");
        });

        app.get('/show', jwtmw, async (req, res) => {
            console.log(req.headers);
            console.log(jwt_decode(req.headers.authorization.substring(7)));
            const result = await col.find().toArray();
            res.send(result);
        });

        app.post('/check', async (req, res) => {
            console.log(req.body);
            const result = await col.findOne({ name: req.body.un });
            console.log(result);
            if (await bcrypt.compare(req.body.pw, result.password)) {
                const token = jwt.sign(result, secretkey, {
                    algorithm: algorithm,
                    expiresIn: "20m"
                });
                res.send({
                    message: result,
                    token: token
                });
            } else {
                res.send({
                    message: "Authentication failed",
                    token: null
                });
            }
        });

        app.get('/file', (request, response) => {
            fs.writeFile("demo.txt", "Welcome to the online donation management system", function (err) {
                if (err) throw err;
                response.send("Data written to file");
            });
        });

        app.get('/append', (request, response) => {
            fs.appendFile("demo.txt", "MSWD class", function (err) {
                if (err) throw err;
                response.send("Data appended to file");
            });
        });

        app.get('/read', async (request, response) => {
            fs.readFile("demo.txt", "utf-8", function (err, data) {
                if (err) throw err;
                console.log(data);
                response.send(data);
            });
        });

        app.delete('/delete', async (req, res) => {
            console.log(req.query.name);
            await col.deleteOne({ name: req.query.name });
            res.send("Deleted data from the database");
        });

        const port = process.env.PORT || 8081;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));
