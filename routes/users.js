import express from "express";
import {createUser,genPassword,getuserByName} from "../helper.js";
import validator from 'validator';
const router = express.Router();

  
router.post("/signup", async (request, response) => {
  
    const {username,password} = request.body;
    const name = await getuserByName(username);

if(name>0)
    {
      console.log("Not a unique user Name");
      // console.log(username);
      return false;
    }
    else{
      const hashedPassword = await genPassword(password);
      const result =await createUser({
      username:username,
      password:hashedPassword});
      response.send(result);
    } 
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