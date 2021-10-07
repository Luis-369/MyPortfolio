var express = require('express');
const { NOW } = require('sequelize');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { title: 'User page' });
});


router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.userName
      },
      defaults: {
        Username: req.body.userName,
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password,
        CreatedAt: req.body.createdAt,
        UpdatedAt: req.body.updatedAt
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

router.post('/login', function(req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.userName,
      Password: req.body.password
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (user) {
      let token = authService.signUser(user); 
      res.cookie('jwt', token);
      // res.send('Login successful');
      res.redirect('/users/profile')
    } else {
      console.log('Wrong password');
      res.redirect('login')
    }
  });
});

router.get('/logout', function (req, res, next) {
    res.cookie('jwt', "", { expires: new Date(0) });
    res.send('Logged out');
});

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          let posts = models.posts.findAll({
            where: {
              UserId: user.UserId
            }
          }).then(posts => {
            res.render("profile", { profile: user, allPosts: posts});
          })
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

router.get('/editpost/:id', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.posts.findByPk(req.params.id).then(post => {
            res.render("editpost", { post: post});
          })
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

router.post('/updatepost/:id', function (req, res, next) {
  models.posts.update({
      PostTitle: req.body.postTitle,
      PostBody: req.body.postBody,
      UpdatedAt: NOW()
    
  },
  {where:{ PostId: req.params.id }}).then(function () {
      res.redirect('/users/profile')
  });
});

router.post('/deletepost/:id', function (req, res, next) {
  models.posts.destroy({where:{ PostId: req.params.id }}).then( res.redirect('/users/profile'));
});

module.exports = router;
