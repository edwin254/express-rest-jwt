const User = require('../models/user');
const bcrypt = require('bcrypt');

// CRUD Controllers

//get all users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

//get user by id
exports.getUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json({ user: user });
        })
        .catch(err => console.log(err));
}

//create user
exports.createUser = (req, res, next) => {
  const {name, email, phone, isAdmin, password} = req.body;
  const salt = bcrypt.genSaltSync();

  User.create({
    name: name,
    email: email,
    phone: phone,
    isAdmin: isAdmin,
    password: bcrypt.hashSync(password, salt)
  })
    .then(result => {
      console.log('Created User');
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

//update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User Does Not Exist!' });
      }
      user = request.body;
      return user.save();
    })
    .then(result => {
      res.status(200).json({message: 'User updated!', user: result});
    })
    .catch(err => console.log(err));
}

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log("USERIS",userId)
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User Does Not Exist!' });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => console.log(err));
}