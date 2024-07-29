import express  from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config({path:'./config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POSt','DELETE','PUT']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

export default app;