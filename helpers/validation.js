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
          message: "You entered an invalid E-Mail adress"
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

module.exports = {
  validateRegistration,
  validateLogin,
}
