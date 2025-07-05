import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import routes from "./src/routes/tasksRoutes.js";
import "./scheduler.js";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(clerkMiddleware());
app.use(express.json());

routes(app);
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
