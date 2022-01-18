import { client } from './index.js';

async function getMoviesByName(filter) {
  return await client
    .db("demo")
    .collection("movies")
    .find(filter)
    .toArray();
}

async function createMovies(data) {
    return await client
      .db("demo")
      .collection("movies")
      .insertMany(data);
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

export{getMoviesByName, createMovies, getMovieByID, deleteMovieByID};