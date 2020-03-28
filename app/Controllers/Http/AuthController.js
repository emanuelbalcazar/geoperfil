'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const Hash = use('Hash');

/**
 * @class AuthController
 */
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

    async recover({ request, auth, response }) {
        const email = request.input("email");
        const user = await User.findByOrFail('email', email);
        const newPassword = this.getRandomNumber();

        if (!user)
            return response.unauthorized('Usuario o contraseña invalidos.');

        let emailStatus = await Mail.send('emails.recover', { user, newPassword }, (message) => {
            message.to(email).from('geoperfilg@mailgun.org').subject('Solicitud de restablecimiento de la contraseña');
        });

        if (emailStatus.accepted.length > 0) {
            user.password = await Hash.make(newPassword.toString());
            user.save();
        } else {
            return response.internalServerError('El email no pudo ser enviado a: ' + email);
        }

        return { id: user.id, email: user.email };
    }

    getRandomNumber() {
        let random = Math.round(Math.random() * 999999);
        return random;
    }
}

module.exports = AuthController
