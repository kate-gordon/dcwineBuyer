const express = require('express'),
  bcrypt = require('bcryptjs'), 
  router = express.Router();

const UserModel = require('../models/users'); 

/* GET users listing. */
router.get('/login', (req, res, next) => {
  res.render("template", {
    locals: {
      title: "Login"
    },
    partials: {
      partial:"partial-login"
    }
  });
});

router.get('/signup', async (req, res, next) => {
  res.render("template", {
    locals: {
      title: "Sign Up"
    },
    partials: {
      partial:"partial-sign-up"
    }
  });
});

router.post("/sign-up", async (req, res, next) => {
  const { first_name, last_name, email_address} = req.body; 

  const salt = bcrypt.genSaltSync(10); 
  const hash = bcrypt.hashSync(req.body.password, salt); 

  const user = new UserModel(first_name, last_name, email_address, hash); 

  const addUser = await user.save(); 
  console.log("Was user added? ", addUser.id); 
  
  if (addUser) {
    res.status(200).redirect("/users/login"); 
  } else {
    res.status(500); 
  }
})

router.post("/login", async (req, res, next) => {
  const { email_address, password } = req.body;

  const user = new UserModel(null, null, email_address, password); 

  const response = await user.login(); 
  console.log(response); 

  if (!!response.isValid) {
    res.sendStatus(200).redirect("/"); 
  } else {
    res.sendStatus(401); 
  }
})

module.exports = router;
