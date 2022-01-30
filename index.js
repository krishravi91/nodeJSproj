
// const express = require('express');  // Old version commonjs in type of packet Json
// const {MongoClient} = require('mongodb'); // Old version commonjs in type of packet Json
//latest import
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import {moviesRouter} from "./routes/movies.js";
import {usersRouter} from "./routes/users.js";
import bcrypt from 'bcrypt';
import cors from "cors";

dotenv.config();// getting all env keys

console.log(process.env);

const app = express();

app.use(express.json());//middleware-- intersept request and convert the same to JSON

app.use(cors());

const mongo_url = process.env.mongo_url;//hidding URL from GIT account


//  const mongo_url = "mongodb://localhost";
  
 async function createConnection() {
  const client = new MongoClient(mongo_url);
  await client.connect();
  console.log("mongodb connected");
  return client;
}
 
export const client = await createConnection();

// const port = 9000;
const PORT=process.env.PORT;

app.get("/",  (request, response) =>{
    response.send("hello World")
});

app.use("/movies", moviesRouter);

app.use("/users", usersRouter);

app.get("/recipes", async(request,response) => {
  
  const recipes = await client
  .db("demo")
  .collection("recipes")
  .find({})
  .toArray();

  response.send(recipes);
})

app.post("/recipes", async(request,response) => {
  const data = request.body;
  const result = await client
  .db("demo")
  .collection("recipes")
  .insertMany(data);

  response.send(result);
})

app.listen(PORT,()=> console.log("the server is started", PORT))







