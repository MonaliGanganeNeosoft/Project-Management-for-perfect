import userCollection from "../modal_Schemas/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const saltRounds = 10//-->used for bcrypt the password
const jwtSecret = "werwerwerwer"//-->used for jwt
//-->Register user
export const registerFunction =(async(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,saltRounds);//-->bcrypt password and saltRounds for string password('$2b$10$CmHlHR/asgZWM0C2uzg7UOnz5GGOfjfv5O1oCYnTmjFdrQX6G9gt6')
    userCollection.findOne({email:req.body.email},(err,data)=>{
        if(err){
            res.json({"err":1,msg:"Something went wrong"})
        }
        else if(data == null){
            let ins = new userCollection({firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,password:req.body.password,profile:req.file.filename})
            ins.save((e)=>{
                if(e){
                    res.json({"err":1,"msg":"Something went wrong adding data"})
                }
                else{
                    res.json({"err":0,"msg":"New user added"})
                }
            })
        }
        else{
            res.json({"err":1,"msg":"user already exist"})
        }
    })
    console.log(req.body) //-->for showing added data in console
})

//->get all user registered
export const getAlluserFunction =(async(req,res)=>{
    userCollection.find((err,data)=>{
        if(err){
            res.json({"err":1,"msg":"err no user"})
        }
        else{
            res.json({"err":0,"msg":"user found all",data:data})
            console.log(data)//-->finding all user
        }
    })
    console.log(res.body)//-->undefined because data present in data not req.cody
})

//-->Login
export const loginFunction = (async(req,res)=>{
    let hashbcrypt = false;
    userCollection.find({},(err,data)=>{ //-->finding all data[i] then compare email and password
        if(err){
            console.log(err,"line 54 if loop")
        }
        else{
            for(let i = 0 ; i < data.length ; i++){
                if(data[i].email === req.body.email){ //-->comparing email
                    hashbcrypt = bcrypt.compareSync(req.body.password,data[i].password) //-->compare password hash and data[i] password
                    if(hashbcrypt){
                        const token = encryptData(data[i]);//-->for jsonwebtoken user in encryptData for creating token
                        res.json({"err":0,"msg":"Login Success","token":token})
                        console.log(data) //-->all users data we get
                        console.log(token) //-->for create token if login user
                        break;
                    }
                }
            }
            if(!hashbcrypt){
                res.json({"err":1,"msg":"Email or password does not match"})
            }
        }
    })
})
const encryptData = (data) => {
    let pay = {...data._doc}
    const token = jwt.sign(pay,jwtSecret,{expiresIn:360000})
    return token;
}
