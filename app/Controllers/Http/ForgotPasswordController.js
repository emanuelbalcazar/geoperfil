'use strict'


const User = use('App/Models/User');
const Mail = use('Mail') // Adonis' mail

const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto') // crypto

class ForgotPasswordController {

    async store ({ request }) {
        try {
          // account request password recovery
          //const { email } = request.only(['email'])
          const { email } = 'emanuelbalcazar13@gmail.com'

          // checking if email is registered
          const user = await User.findBy('id', 1)
    
          // generating token
          const token = crypto.randomBytes(10).toString('hex')
    
          // registering when token was created and saving token
          user.token_created_at = new Date()
          user.token = token
    
          // persisting data (saving)
          await user.save()
    
          await Mail.send('emails.recover', { user, token }, (message) => {
            message
              .from('<from-email>')
              .to(email)
          })
    
          return user
        } catch (err) {
          console.log(err)
        }
    }



}

module.exports = ForgotPasswordController
