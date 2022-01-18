import express from "express";
import {getMoviesByName, createMovies, getMovieByID, deleteMovieByID} from "../helper.js";
const router = express.Router();

router.get("/", async(request, response) => {
    console.log(request.query);
    // const {language,rating} = request.query;
  
    //db.movies.find({"language":"Tamil"})
  
    const filter = request.query;
    if(filter.rating){
      filter.rating = +filter.rating;
    }
  
    const movies = await getMoviesByName(filter);
   
    response.send(movies);
});
  
router.post("/", async (request, response) => {
    
    const data = request.body;
    console.log("incoming data", data);
  
   const result = await createMovies(data);
      response.send(result);//comment
});
  //11
router.get("/:id",  async(request, response) => {
  const {id} = request.params;
  const movie = await getMovieByID(id);
  movie 
      ? response.send(movie) 
      : response.status(404).send({msg: "movies not found"});
});

router.delete("/:id",  async(request, response) => {
    const {id} = request.params;
    const movie = await deleteMovieByID(id);
    movie 
        ? response.send(movie) 
        : response.status(404).send({msg: "movies not found"});
});

export const moviesRouter=router;