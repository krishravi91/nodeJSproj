import express from "express";
import {createUser,genPassword,getuserByName} from "../helper.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/signup", async (request, response) => {
  
  const {username,password} = request.body;    
  
  const isUserExist = await getuserByName(username);

  if(isUserExist){
    response.status(400).send({message:"Invalid Credentials"});
    return;
  }

  if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
    response.status(400).send({message:"Pattern did not match"});
    return;
  }

  const hashedPassword = await genPassword(password);
  const result =  await createUser({
    username:username,
    password: hashedPassword
  });
response.send(result);
  
});

router.post("/signin", async (request, response) => {
  
  const {username,password} = request.body;    
  
  const isUserExist = await getuserByName(username);

  if(isUserExist){
    response.status(400).send({message:"Invalid Credentials"});
    return;
  }

  if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
    response.status(400).send({message:"Pattern did not match"});
    return;
  }

  const hashedPassword = await genPassword(password);
  const result =  await createUser({
    username:username,
    password: hashedPassword
  });
response.send(result);
  
});


router.post("/login", async (request, response) => {
  
    const {username,password} = request.body;    
    const userfromDB = await getuserByName(username);
    console.log("userfromDB",userfromDB);

if(!userfromDB)
    {
      response.status(400).send({message:" Invalid Credentials"});
      return;
    } 
  
const storedPassword = userfromDB.password;
const isPasswordMatch = await bcrypt.compare(password,storedPassword);
console.log(storedPassword);

if(isPasswordMatch){
  const token = jwt.sign({id:userfromDB._id},process.env.SECRET_KEY);
  response.send({message:"successful login", token: token});
} else{
  response.status(401).send({message:" Invalid Credentials"});
  return;
}
   
});

  
export const usersRouter=router;