import fetch from 'node-fetch';
import cors from 'cors';
import express from "express";

const app = express();

app.use(cors());

const res = await fetch('http://pneumoindutech.ru/api/v1/partnercatalog');
const data = await res.json();

app.get("/api/v1/partnercatalog", (request, response, next) => {
    response.send(data);
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});