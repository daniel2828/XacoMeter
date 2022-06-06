const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function singUp(req, res) {
  const user = new User();
  const { name, lastName, email, password, repeatPassword } = req.body;
  console.log(lastName);

  user.name = name;
  user.lastname = lastName;
  user.email = email.toLowerCase();
  //Default values
  user.role = "admin";
  user.active = true;
  console.log(req.body);
  if (!password || !repeatPassword) {
    res.status(400).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res.status(400).send({ message: "Las contraseñas no son iguales" });
    } else {
      // encryp password
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe" });
            } else {
              if (!userStored) {
                res.status(500).send({ message: "Error al crear usuario." });
              } else {
                res
                  .status(200)
                  .send({
                    user: userStored,
                    message: "Usuario creado crrectamente.",
                  });
              }
            }
          });
        }
      });
      //res.status(200).send({ message: "Usuario creado" });
    }
  }
}

function singIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;
  // Find by email in mongo database
  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else if (!userStored) {
      res.status(404).send({ message: "Email no encontrado." });
    } else {
      // Check password
      bcrypt.compare(password, userStored.password, (err, check) => {
        if (err) {
          res.status(500).send({ message: "Error de servidor." });
        } else if (!check) {
          res.status(404).send({ message: "La contraseña no es correcta." });
        }  else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: jwt.createRefreshToken(userStored),
          });
        }
      });
    }
  });
}
async function getUsers(req, res) {
 
  // Find by email in mongo database
  let users = await User.find();
  res.status(200).send(users);
}
module.exports = {
  singUp,
  singIn,
  getUsers
};
