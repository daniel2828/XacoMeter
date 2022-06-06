const express = require("express");

const UserController = require("../controllers/user");
const api = express.Router();
const md_auth = require("../middlewares/authenticated");
api.post("/sign-up", UserController.singUp);
api.post("/sign-in", UserController.singIn);
api.get("/", [md_auth.ensureAuth], UserController.getUsers)
module.exports = api;
