import projectCollection from "../modal_Schemas/projectSchema.js";

//-->Add project(create new project)
export const addNewProjectFunction = (async(req,res)=>{
    let ins = new projectCollection({user_email:req.body.user_email,title:req.body.title,demo:req.body.demo,github:req.body.github,description:req.body.description})
    await ins.save((e)=>{
        if(e){
            res.json({"err":1,"msg":"Something went wrong"})
        }
        else{
            res.json({"err":0,"msg":"Successfully added"})
            console.log(ins)//-->display added data
        }
    })
})
//-->fetch all project 
export const fetchAllProjectFunction =((req,res)=>{
    projectCollection.find({flag:1},(e,data)=>{
        if(e){
            res.json({"err":1,"msg":"err to found"})
        }
        else{
            res.json({"err":0,"msg":"data fetch all presant",data:data})
            console.log(data)
        }
    })
})
//-->fetch project as one we get project
export const fetchProjectFunction=((req,res)=>{
    projectCollection.findOne(req.query,(e,data)=>{
        console.log(req.query)
        if(e){
            res.json({"err":1,"msg":"not found"})
        }
        else{
            res.json({"err":0,"msg":"found data",data:data})
            console.log(data)//-->getting data
        }
    })
})

//-->update project
export const updateprojectFunction =((req,res)=>{
    console.log(req.body);
    projectCollection.updateOne({_id:req.body.id},{$set:{title:req.body.title,demo:req.body.demo,github:req.body.github,description:req.body.description}},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Not updated"})
        }
        else{
            res.json({"err":0,"msg":"data updated"})
        }
    })
})
//-->delete function(slitly delete project and flag is 0)
export const deleteprojectFunction=((req,res)=>{
    projectCollection.findOneAndUpdate(req.query,{$set:{flag:0}},{new:true},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"not delete err"})
        }
        else{
            console.log(data,"line");
            res.json({"err":0,"msg":"data delete"})
        }
        
    })
})