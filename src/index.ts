import express, { Request, Response } from "express";
import { AuthController } from "./controllers/authController";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const authController = new AuthController();

  authController.Request = req;

  const result = authController.login(req.body);

  if (!result) {
    return res.status(500).send("Internal Server Error");
  }

  if (result.statusCode === 404) {
    return res.status(404).send(result.data);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
