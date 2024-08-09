import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routers/routers.js";
import db from "./config/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

let corsOptions = {
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:false}));

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT,() =>{
   console.log(`Server is running on port http://localhost:${PORT}`);
});
