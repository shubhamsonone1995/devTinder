const userAuth = (req, res, next) => {
    //this funtion is tearted as middleware bcs its passes the with te next() function 
    //useFull for the authentication of api
    const token = "xyz"
    const isAdminAutherized = token === "shubham"
    if (!isAdminAutherized) {
        console.log("Auth middleware is called")
        res.status(401).send("Unautherized requiest!!!!")
    } else {
        next()
    }
}
module.exports = {
    userAuth
};