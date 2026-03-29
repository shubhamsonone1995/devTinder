const express = require("express");

const app = express();
const { userAuth } = require("./middlewares/auth")

app.use("/home", userAuth, (req, res, next) => {
    //this function is treated as route handler bcs its send the request to the client or terminate the chain.
    res.send("Hello From the home from route handler !!!!")
})
app.listen(3000, () => {
    console.log("Server is successfully listning onport 3000")
})