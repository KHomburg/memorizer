const dotenv = require("dotenv");
require('dotenv').config()
const mailjet = require ('node-mailjet').connect('701d0f3f3495b3a2dbfcb57bbc4c1a59', 'a25ad4740aa31de31eeff4633567c63a')
const models = require("../models")

//configure:
dotenv.config({ path: "../.env" });
var senderMailAdress = process.env.SENDER_MAIL

/**
 * 
 * user Object
 * password String
 * 
 */
const passwordResetMail = (user, password) => {
  const mail = models.Mail.create({
    type: "password reset",
    adressee: user.id,
  })

  return(
    mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": senderMailAdress,
            "Name": "Password Change"
          },
          "To": [
            {
              "Email": user.email,
            }
          ],
          "Subject": "New Password",
          "TextPart": 'We recieved a request for reseting the password for your account. Your new password is: ' +password,
          "HTMLPart": '<p>We recieved a request for reseting the password for your account.</p> <p>Your new password is: ' +password+ '</p>',
        }
      ]
    })
  )
}

module.exports = {
  passwordResetMail,
}