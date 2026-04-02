const express = require("express");
const connectDB = require("./config/database")
require("./config/database")
const app = express();
const User = require("./models/user")

// express.json() This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())

app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send("User Added Successfully!!!!")
    } catch (err) {
        res.status(400).send("Error while saving the user:" + err.message)
    }
})
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId
        const user = await User.find({ emailId: userEmail });
        if (user.length > 0) {
            res.send(user)
        } else {
            res.status(400).send("User not found")
        }

    } catch (err) {
        res.status(400).send("Something went wrong!!")
    }
})
app.get("/users", async (req, res) => {
    try {
        const allUsers = await User.find({})
        if (allUsers.length > 0) {
            res.send(allUsers)
        } else {
            res.send([])
        }
    } catch (err) {
        res.status(400).send("Something went wrong!!")
    }
})
connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is successfully connected to DB and listning onport 3000")
    })
}).catch((error) => {
    console.log("Database cannot be connected")
})
