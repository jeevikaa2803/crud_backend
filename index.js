const express= require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const { config } = require('dotenv')
const bodyParser=require('body-parser')
config({path:'./configuration/.env'})
const app=express()

//mongoose connect
mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('server is connected')
})
.catch(()=>{
    console.log("err")
})

//middle
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    origin:"*"
}))

//schema
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    
    contact:Number
})
const userModel=mongoose.model('EMP',userSchema)
app.get('/',(req,res)=>{
    res.json(hello)
})
//post
app.post('/api/user',async(req,res)=>{
    let user={
        name:req.body.name,
        email:req.body.email,
       
        contact:req.body.contact
    }
    let data=await userModel.create(user)
    res.json({"message":"added successfully"})
})
//get user by id
app.get('/api/user/:id',async(req,res)=>{
    let id=req.params.id;

    let data=await userModel.findById({_id:id}) 
       //data=[]\
    console.log(data)
    res.json(data)
})

//get
app.get('/api/user',async(req,res)=>{
    let data=await userModel.find()
    //data=[]
    res.json(data)
})
//put
app.put('/api/user/:id',async(req,res)=>{
    let user={
        name:req.body.name,
        email:req.body.email,
        
        contact:req.body.contact
    }
    let updateuser=await userModel.updateOne({_id:req.params.id},{$set:user})
    res.json({"message":"user update successfully",updateuser})
})

//delete

app.delete('/api/user/:id',async(req,res)=>{
    let deleteuser=await userModel.deleteOne({_id:req.params.id})
    res.json({"message":"user deleted successfully","user":deleteuser})
})

//listen
app.listen(5000,()=>{
    console.log("server is running http://localhost:5000")
})