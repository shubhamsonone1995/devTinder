const express = require("express");
const connectDB = require("./config/database")
require("./config/database")
const app = express();
const cookieParser = require('cookie-parser')


// express.json() This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is successfully connected to DB and listning onport 3000")
    })
}).catch((error) => {
    console.log("Database cannot be connected")
})
