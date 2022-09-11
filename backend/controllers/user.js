const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

const logger = require("../logging/winstonLogger");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function singUp(req, res) {
  const user = new User();
  const { name, lastName, email, password, repeatPassword } = req.body;
  

  user.name = name;
  user.lastname = lastName;
  user.email = email.toLowerCase();
  //Default values
  user.role = "basic";
  user.active = true;
 
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
  const email = params.email.toLowerCase().toString();
  const password = params.password;
  // Find by email in mongo database
  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else if (!userStored) {
      res.status(404).send({ message: "Email no encontrado." });
    } else {
      // Check password
      if(!userStored.active){
        res.status(404).send({ message: "Usuario inactivo." });
      }else{
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
    }
  });
}
async function createUser(req, res) {
  const  {name,lastName,email, password, adminUser} = req.body;
  const user = new User();
  user.name = name;
  user.lastname = lastName;
  user.active = true;
  user.role = (adminUser ? "admin" : "basic");
  user.email = email;

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
  })

}
async function getUsers(_req, res) {
 
  // Find by email in mongo database
  let users = await User.find();
  res.status(200).send(users);
}

async function modify_user(req, res) {

  const {_id, active} = req.body;
  let response = await User.findByIdAndUpdate(_id, {$set: {active: active}});

  res.status(200).send(response);
}
async function deleteUser(req, res) {
  const {id} = req.params;
 
  let response = await User.findByIdAndDelete(id);

  res.status(200).send(response);
}
// async..await is not allowed in global scope, must use a wrapper
async function encryptPass(req, res) {
  const {id} = req.params;
  User.findById(id,async (err, userStored) => {
    bcrypt.hash(userStored.password, null, null, async function (err, hash) {
      let response = await User.findByIdAndUpdate(id, {$set: {password: hash}});
      res.status(200).send(response);
    })
    
  })
 
  
 
}
module.exports = {
  singUp,
  singIn,
  getUsers,
  modify_user,
  createUser,
  deleteUser,
  encryptPass

};
