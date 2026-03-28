const express=require("express");

const app=express();

app.use("/",(req,res)=>{
res.send("Hello From the sever!!!!")
})
app.use("/test",(req,res)=>{
res.send("Hello From the test sever!!!!")
})
app.listen(3000,()=>{
    console.log("Server is successfully listning onport 3000")
})