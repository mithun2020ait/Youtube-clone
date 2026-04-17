import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}))

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))

app.use(cookieParser())

//Import Routes
import userRoutes from './routes/user.routs.js';

//Use Routes
app.use("/api/v1/users", userRoutes);

export { app };