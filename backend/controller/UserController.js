import userCollection from "../modal_Schemas/userSchema.js";

export const registerFunction =(async(req,res)=>{
    userCollection.findOne({email:req.body.email},(err,data)=>{
        if(err){
            res.json({"err":1,msg:"Something went wrong"})
        }
        else if(data == null){
            let ins = new userCollection({firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,password:req.body.password,profile:req.body.profile})
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