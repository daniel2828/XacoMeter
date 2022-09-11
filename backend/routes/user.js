const express = require("express");

const UserController = require("../controllers/user");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");
api.post("/sign-up", UserController.singUp);
api.post("/sign-in", UserController.singIn);
api.get("/", [md_auth.ensureAuth], UserController.getUsers);
api.post("/active", [md_auth.ensureAuth], UserController.modify_user);
api.post("/createUser", [md_auth.ensureAuth], UserController.createUser);
api.delete("/deleteUser/:id",  [md_auth.ensureAuth], UserController.deleteUser)

api.post("/encryptPass/:id",   UserController.encryptPass)
module.exports = api;
