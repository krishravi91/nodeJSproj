import express from "express";
import {createUser,genPassword,getuserByName} from "../helper.js";
import bcrypt from 'bcrypt';
const router = express.Router();

  
router.post("/signup", async (request, response) => {
  
    const {username,password} = request.body;    
    const userfromDB = await getuserByName(username);

if(!userfromDB)
    {
      response.status(400).send({message:" Invalid Credentials"});
      return;
    } 
  
const storedPassword = userfromDB.password;
const isPasswordMatch = await bcrypt.compare(password,storedPassword);
console.log(storedPassword);

if(isPasswordMatch){

} else{
  response.status(401).send({message:" Invalid Credentials"});
      return;
}

response.send(isPasswordMatch);
    
});

// function validate(password) {
//   console.log(password);
//   if (validator.isStrongPassword(password, {
//     minLength: 8, minLowercase: 1,
//     minUppercase: 1, minNumbers: 1, minSymbols: 1
//   })) {
//     setErrorMessage('Is Strong Password');
//   } else {
//     setErrorMessage('Is Not Strong Password');
//   }
// }
  
export const usersRouter=router;