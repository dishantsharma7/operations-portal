import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
//routes

//
app.use(globalErrorHandler);
app.use(notFound);
export default app;
