import app from "./app.js";
import dotenv from 'dotenv';
import cloudinary from "cloudinary";

dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server running on port :${port}`);
});


