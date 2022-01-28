import { client } from './index.js';
import bcrypt from 'bcrypt';

async function getMoviesByName(filter) {
  return await client
    .db("demo")
    .collection("movies")
    .find(filter)
    .toArray();
}

async function getuserByName(username) {
  return await client
    .db("demo")
    .collection("users")
    .count({username:username});
}

async function createMovies(data) {
    return await client
      .db("demo")
      .collection("movies")
      .insertMany(data);
}

async function createUser(data) {
  return await client
    .db("demo")
    .collection("users")
    .insertOne(data);
}
  
async function getMovieByID(id) {
    return await client
      .db("demo")
      .collection("movies")
      .findOne({ id: id });
}

async function deleteMovieByID(id) {
  return await client
    .db("demo")
    .collection("movies")
    .deleteOne({ id: id });
}

async function updateMovieByID(id, updatedMovie) {
  return await client
    .db("demo")
    .collection("movies")
    .updateOne({ id: id },{$set: updatedMovie});
}

async function genPassword(password){
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password,salt);
  console.log(hashedPassword);
  return hashedPassword;
}

export{getMoviesByName, createMovies, getMovieByID, deleteMovieByID, updateMovieByID,createUser,genPassword,getuserByName};