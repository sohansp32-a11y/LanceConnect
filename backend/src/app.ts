import express from "express";
import auth_router from "./routers/auth.controller";

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send(
        {
            message: "LanceConnect API Running!"
        }
    )
})

app.use("/auth", auth_router)

export default app;