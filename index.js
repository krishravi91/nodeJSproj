
// const express = require('express');  // Old version commonjs in type of packet Json
// const {MongoClient} = require('mongodb'); // Old version commonjs in type of packet Json
//latest import
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();// getting all env keys

console.log(process.env);

const app = express();

// app.use(express.json());//middleware-- intersept request and convert the same to JSON

const mongo_url = process.env.mongo_url;//hidding URL from GIT account


//  const mongo_url = "mongodb://localhost";
  
 async function createConnection() {
  const client = new MongoClient(mongo_url);
  await client.connect();
  console.log("mongodb connected");
  return client;
}
 
const client = await createConnection();

  app.get("/",  (request, response) =>{
    response.send("hello World")
  });

// const port = 9000;
const PORT=process.env.PORT;

app.get("/movies", async(request, response) => {
  console.log(request.query);
  // const {language,rating} = request.query;

  //db.movies.find({"language":"Tamil"})

  const filter = request.query;
  if(filter.rating){
    filter.rating = +filter.rating;
  }

  const movies = await client
    .db("demo")
    .collection("movies")
    .find(filter)  
    .toArray();
 
  response.send(movies);
});

app.post("/movies", express.json(), async (request, response) => {
  
  const data = request.body;
  console.log("incoming data", data);

 const result = await client
                  .db("demo")
                  .collection("movies")
                  .insertMany(data);
    response.send(result);//comment
});
//11
app.get("/movies/:id",  async(request, response) => {
const {id} = request.params;
const movie = await client
    .db("demo")
    .collection("movies")
    .findOne({id:id});
movie 
    ? response.send(movie) 
    : response.status(404).send({msg: "movies not found"});
});

app.listen(PORT,()=> console.log("the server is started", PORT))
