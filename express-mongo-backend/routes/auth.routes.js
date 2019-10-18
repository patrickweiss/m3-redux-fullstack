const authController = require("express").Router();
// User model
const User           = require("../models/User");

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

authController.get("/signup", (req, res) => {
  console.log("GET SIGNUP")
});

authController.post("/signup", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;


  if (username === "" || userPassword === "") {
    console.log("Please provide both, username and password.");
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      console.log("The username already exists, please pick another one." );
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(userPassword, salt);

    User
      .create({username, password, firstname, lastname})
      .then((response) => res.status(200).send(response))
      .catch(err => console.log(err));
  });
});

authController.get("/login", (req, res) => console.log(res));

authController.post("/login", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;

  if (username === "" || userPassword === "") {
    console.log("Provide both, username and password to login." );
    return;
  }

  User.findOne({ username }, "_id username password", (err, user) => {
    if (err || !user) {
      console.log("The username doesn't exist.");
    } else {
      if (bcrypt.compareSync(userPassword, user.password)) {
        req.session.currentUser = user;
        
      } else {
        console.log("Incorrect password." );
      }
    }
  });
});

authController.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) { 
    console.log("you're logged out")
    return; 
  }

  req.session.destroy( err => {
    if (err) { 
      console.log(err); 
    } else { 
      console.log("you should login")
    }
  });
});

module.exports = authController;