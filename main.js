import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import Project from "./routes/Projects.route.js";
import cors from "cors"
dotenv.config()


// main app
const app = express()


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/Project", Project);
app.use(cors({ origin: "https://iad-rrs-website.vercel.app/" }));

//Database Connection
const db = mongoose.connect(process.env.Mongo_URI)
    .then(() => console.log("Database connection sucessfull."))
    .catch((err) => console.error("Error connecting to Database ", err))


app.get("/", (req, res) => {
    res.send("The backend App is running!")
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})