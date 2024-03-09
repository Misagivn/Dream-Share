const User = require('../models/User');

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findByCredentials(username, password)
      .then(user => {
        req.session.loggedin = true;
        req.session.username = username;
        req.session.isAdmin = user.isAdmin;
        res.redirect('/home');
      })
      .catch(error => {
        res.send('Incorrect username or password!');
      });
  } else {
    res.send('Please enter username and password!');
  }
};

exports.register = (req, res) => {
  const { username, password, isAdmin } = req.body;
  if (username && password) {
    User.create({ username, password, isAdmin })
      .then(() => {
        res.send('Registration successful!');
      })
      .catch(error => {
        res.send('Registration failed!');
      });
  } else {
    res.send('Please enter username and password!');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
};

exports.checkAdmin = (req, res, next) => {
  if (req.session.loggedin && req.session.isAdmin) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};