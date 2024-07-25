const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');

// Method to create a new user
exports.createUser = [
  // Validation middleware
  body('name').isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('email').isEmail().withMessage('Invalid email format'),
  async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    try {
      const emailExists = await new Promise((resolve, reject) => {
        User.getUserByEmail(email, (err, row) => {
          if (err) {
            return reject(new Error('Error checking email: ' + err.message));
          }
          resolve(row.length > 0);
        });
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const id = await new Promise((resolve, reject) => {
        User.create(name, email, (err, id) => {
          if (err) {
            return reject(new Error('Error creating user: ' + err.message));
          }
          resolve(id);
        });
      });

      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }
];

// Method to get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await new Promise((resolve, reject) => {
      User.getAll((err, users) => {
        if (err) {
          return reject(new Error('Error fetching users: ' + err.message));
        }
        resolve(users);
      });
    });
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

// Method to get a user by ID
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await new Promise((resolve, reject) => {
      User.getById(id, (err, user) => {
        if (err) {
          return reject(new Error(`Error fetching user with id ${id}: ${err.message}`));
        }
        if (!user) {
          return reject(new Error(`User with id ${id} not found`));
        }
        resolve(user);
      });
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Method to update a user
exports.updateUser = [
  body('name').isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('email').isEmail().withMessage('Invalid email format'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const changes = await new Promise((resolve, reject) => {
        User.update(id, name, email, (err, changes) => {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              return reject(new Error('Email already exists'));
            }
            return reject(new Error(`Error updating user with id ${id}: ${err.message}`));
          }
          if (changes === 0) {
            return reject(new Error(`User with id ${id} not found`));
          }
          resolve(changes);
        });
      });
      res.json({ updated: changes });
    } catch (err) {
      next(err);
    }
  }
];

// Method to delete a user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const changes = await new Promise((resolve, reject) => {
      User.delete(id, (err, changes) => {
        if (err) {
          return reject(new Error(`Error deleting user with id ${id}: ${err.message}`));
        }
        if (changes === 0) {
          return reject(new Error(`User with id ${id} not found`));
        }
        resolve(changes);
      });
    });
    res.json({ deleted: changes });
  } catch (err) {
    next(err);
  }
};
