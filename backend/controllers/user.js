const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const nodemailer = require("nodemailer");
function singUp(req, res) {
  const user = new User();
  const { name, lastName, email, password, repeatPassword } = req.body;
  console.log(lastName);

  user.name = name;
  user.lastname = lastName;
  user.email = email.toLowerCase();
  //Default values
  user.role = "basic";
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
  user.password = password;
  const response = await user.save();
  res.status(200).send(response);
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
async function passRecovery(req, res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const {userEmail} = req.body; 
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //   to: "white.sharks.produtions@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).send("sent")
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = {
  singUp,
  singIn,
  getUsers,
  passRecovery,
  modify_user,
  createUser,
  deleteUser

};
