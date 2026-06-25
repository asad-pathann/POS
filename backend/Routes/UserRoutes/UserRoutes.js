import express from "express";
import {
  deleteUser,
  getAllUser,
  LoginUser,
  registerUser,
  singleUser,
  updateUser,
} from "../../Controller/UserController/UserController.js";

export const UserRouter = express.Router();

UserRouter.post("/register-user", registerUser);

UserRouter.post("/login-user", LoginUser);

UserRouter.get("/get-user", getAllUser);

UserRouter.get("/get-singleUser/:id", singleUser);

UserRouter.put("/update-user/:user_id", updateUser);

UserRouter.delete("/delete-user/:user_id", deleteUser);
