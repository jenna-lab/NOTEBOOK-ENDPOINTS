import express from "express";
import noterouter from "./routes/noteBookRoutes";


const app = express();
app.use(express.json());

app.use("/notes", noterouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port: ${port}`));

