import express from "express";
import auth_router from "./routers/auth.router";
import users_router from "./routers/users.router"
import org_router from "./routers/org.router"

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
app.use("/user", users_router)
app.use("/org", org_router)

export default app;