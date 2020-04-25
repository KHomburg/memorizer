const validate = require("validate.js")

//error message formatter
validate.formatters.custom = function(errors) {
  return errors.map(function(error) {
    return error.options.message;
  });
};


//Validation for registration input:
const validateRegistration = (req, res) => {
  return new Promise((resolve, reject) =>{
    var registerConstraints = {
      email: {
        presence: {
          message: "Email adress is required"
        },
        email: {
          message: "You entered an invalid E-Mail address"
        }
      },
      username: {
        presence: {
          message: "Username is required"
        }
      },
      password: {
        presence: {
          message: "Password is required"
        },
        length: {
          minimum: 6,
          message: "Password must be at least 6 characters"
        }
      },
      password2: {
        presence: {
          message: "Password verification is required"
        },
        equality:{
          attribute: "password",
          message: "Passwords do not match"
        }
      }
    }
    resolve(validate(req.body, registerConstraints, {format: "custom"}))
  })
}

//Validation for login input:
const validateLogin = (req, res) => {
  return new Promise((resolve, reject) =>{
    var loginConstraints = {
      email: {
        presence: {
          message: "Email is required"
        },
        email: {
          message: "You entered an invalid E-Mail"
        }
      },
      password: {
        presence: {
          message: "Password is required"
        },
        length: {
          minimum: 6,
          message: " must be at least 6 characters"
        }
      },
    }
    resolve(validate(req.body, loginConstraints, {format: "custom"}))
  })
}

//Validation for note Input
const validateNote = (req, res) => {
  return new Promise((resolve, reject) =>{
    var noteConstraints = {
      title: {
        presence: {
          message: "Title is required"
        },
      },
      text: {
        presence: {
          message: "Text is required"
        }
      },
    }
    resolve(validate(req.body, noteConstraints, {format: "custom"}))
  })
}

//Validation for updating user
const validateUserUpdate = (req, res) => {
  return new Promise((resolve, reject) =>{
    var userUpdateConstraints = {
      email: {
        presence: {
          message: "Email adress is required"
        },
        email: {
          message: "You entered an invalid E-Mail address"
        }
      }
    }
    resolve(validate(req.body, userUpdateConstraints, {format: "custom"}))
  })
}

//Validation for registration input:
const validateCredentialUpdate = (req, res) => {
  return new Promise((resolve, reject) =>{
    var registerConstraints = {
      newemail: {
        presence: {
          message: "Email adress is required"
        },
        email: {
          message: "You entered an invalid E-Mail address"
        }
      },
    }
    resolve(validate(req.body, registerConstraints, {format: "custom"}))
  })
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateNote,
  validateUserUpdate,
  validateCredentialUpdate,
}
