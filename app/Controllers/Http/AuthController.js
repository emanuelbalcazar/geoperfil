'use strict'

const User = use('App/Models/User');
const Mail = use('Mail')/**/


class AuthController {

    async register({ request, auth, response }) {
        let user = request.post();
        let count = await User.query().where({ email: user.email }).getCount();

        if (count > 0) {
            return response.conflict({ code: 409, message: 'El email ya se encuentra registrado' });
        }

        user = await User.create(user);
        let accessToken = await auth.generate(user);

        return response.json({ user: user, access_token: accessToken });
    }

    async login({ request, auth, response }) {
        const email = request.input("email");
        const password = request.input("password");

        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email);
                let accessToken = await auth.generate(user);
                return response.json({ user: user, access_token: accessToken });
            }
        }
        catch (error) {
            return response.unauthorized('Usuario o contraseña invalidos.');
        }
    }

    async recover({request, auth, response }) {
        const email = request.input("email");
        let user = await User.findBy('id', 1);
        console.log(email)
        await Mail.send('emails.recover', user.toJSON(), (message) => {
            message
              .to(email)
              .from('<from-email>')
              .subject('Welcome to GeoPerfil')
          })
    }


}

module.exports = AuthController
